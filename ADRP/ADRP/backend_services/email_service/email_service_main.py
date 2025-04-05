from enum import Enum

from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string


class EmailService:
    class Purpose(Enum):
        LOGIN = "LOGIN"
        DOWNLOAD_DATASET = "DOWNLOAD_DATASET"
        APPROVE_SUBMISSION = "APPROVE_SUBMISSION"
        REJECT_SUBMISSION = "REJECT_SUBMISSION"
        NEW_SUBMISSION = "NEW_SUBMISSION"

    class Subject(Enum):
        LOGIN = "Your One-Time-Password"
        DOWNLOAD_DATASET = "Link to download your dataset"
        APPROVE_SUBMISSION = "Your Submission has been approved"
        REJECT_SUBMISSION = "Your Submission has been rejected"
        NEW_SUBMISSION = "A new Submission has been received"

    class PlainTextBody(Enum):
        LOGIN = "ADRP/email_templates/txt/login_template.txt"
        DOWNLOAD_DATASET = "ADRP/email_templates/txt/download_dataset_template.txt"
        APPROVE_SUBMISSION = "ADRP/email_templates/txt/submission_approved_template.txt"

    class HtmlBody(Enum):
        LOGIN = "ADRP/email_templates/html/login_template.html"
        DOWNLOAD_DATASET = "ADRP/email_templates/html/download_dataset_template.html"
        APPROVE_SUBMISSION = "ADRP/email_templates/html/submission_approved_template.html"

    def __init__(self, recipients: list[str], purpose: str, context: dict):
        """
        Service responsible for sending emails.

        :param recipient: Email address of the intended recipient.
        :param purpose: Purpose of the email, expected to match one of the predefined purposes in EmailService.Purpose.
        :param context: Context data used to render the email body.
        """

        self.recipients = recipients
        self.subject = self.Subject[purpose].value

        self.plain_text_body = render_to_string(self.PlainTextBody[purpose].value, context)
        self.html_body = render_to_string(self.HtmlBody[purpose].value, context)

        self.purpose = purpose

    def __str__(self):
        preview = self.plain_text_body[:50]
        return (f"Email to: {self.recipients}, \nPurpose: {self.purpose}, \nSubject: {self.subject}, "
                f"\nContext: {self.plain_text_body} \nContent Preview: {preview}")

    def send(self):
        """ Sends the appropriate email to the provided recipient. This should only be used when there is 1 recipient
        as it establishes a new SMTP connection every time a new email is sent."""
        msg = EmailMultiAlternatives(
            subject=self.subject,
            body=self.plain_text_body,
            to=self.recipients,
        )
        msg.attach_alternative(self.html_body, "text/html")
        msg.send()

        return msg


