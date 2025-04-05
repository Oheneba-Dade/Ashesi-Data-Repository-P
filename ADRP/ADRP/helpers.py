def check_email_domain(email : str) -> bool:
    """Checks the email domain.
    :return: True if the email domain is Ashesi Based, False otherwise.
    """
    domain = email.split('@')[-1]
    valid_domains = ("alumni.ashesi.edu.gh", "ashesi.edu.gh")

    return True if domain in valid_domains else False

