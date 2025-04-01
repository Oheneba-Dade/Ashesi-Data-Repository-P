import secrets
import string

from django.contrib.auth.models import update_last_login
from django.core.exceptions import ValidationError
from django.db import transaction
from rest_framework.request import Request

from .accounts_service_repository import *
from ..statistics_service.statistics_service_repository import *
from .custom_jwtserializer import OTPTokenObtainPairSerializer
from ..email_service.email_service_main import EmailService


class AccountsService:

    @staticmethod
    def check_user_exists(request_obj: Request) -> bool:
        return user_exists_by_email(request_obj.query_params.get("email"))

    @staticmethod
    def generate_otp(otp_length=6, lifetime=5) -> tuple[str, int]:
        """Generates an OTP for a user.

        :param request: Request object with request parameters
        :param otp_length: Number of characters in the OTP string. Default is 6
        :param lifetime: Valid lifetime of the OTP in minutes. Default is 5 minutes
        :param admin: Boolean flag to indicate if the user is an administrator
        :returns: Returns a tuple containing the OTP and its lifetime in minutes
        """

        # Generate the OTP
        chars = string.ascii_uppercase + string.digits
        otp_chars = ''.join(secrets.choice(chars) for char in range(otp_length))

        return otp_chars, lifetime

    @staticmethod
    def associate_otp_with_user(request_obj: Request, otp_ref: tuple[str, int]) -> OTP:
        """Associates an OTP with a particular user. Creates the user if they do not exist since this
        also accommodates sign up

        :param request_obj: Request object with request parameters
        :param otp_ref: Tuple containing otp characters and lifetime
        :returns: OTP object associated with the user"""

        new_otp, lifetime = otp_ref

        # Associate with user (create user if they are new)
        user = User.objects.filter(email=request_obj.query_params.get("email")).first()
        if user:
            new_otp = create_new_otp(user, new_otp, lifetime)
        else:
            user = AccountsService.create_new_user(request_obj)
            increment_global_user_count()
            new_otp = create_new_otp(user, new_otp, lifetime)

        return new_otp

    @staticmethod
    def create_new_user(request_obj: Request) -> User:
        """Creates a new regular user. Automatically determines if a user is 'Internal or 'External'
        based on the email address domain"""

        print("the new user is >", request_obj.query_params.get("email"))
        return User.objects.create_user(email=request_obj.query_params.get("email"))

    @staticmethod
    def create_new_admin(request_obj: Request) -> User:
        """Creates a new admin user."""

        return User.objects.create_admin(email=request_obj.query_params.get("email"), role='admin')

    @staticmethod
    def send_otp(otp_obj: OTP):
        """ Sends the OTP to its associated user """

        email_service = EmailService(recipients=[otp_obj.user.email],
                                     purpose="LOGIN",
                                     context={"otp": otp_obj.otp, "otp_lifetime": otp_obj.life_time_mins})
        email_service.send()

    @staticmethod
    @transaction.atomic
    def get_otp(request_obj: Request) -> OTP:
        """Performs the full OTP retrieval and delivery chain: generate, associate, send"""

        otp_details = AccountsService.generate_otp()
        new_otp = AccountsService.associate_otp_with_user(request_obj, otp_details)

        AccountsService.send_otp(new_otp)

        return new_otp

    @staticmethod
    def validate_otp(request_obj: Request, clean=True) -> OTP | None:
        """Checks if OTP is valid (within expiration time).
       By default, deletes expired or invalid OTPs in the process

        :param request_obj: Request object with request parameters
        :param clean: Boolean flag to indicate whether invalid OTPs should be deleted or not. Default is True (delete
        invalid OTPs)
        :returns: Returns OTP object if valid, or None if it does not exist"""

        otp = get_otp(request_obj.data.get("otp"), request_obj.data.get("email"))

        # Check validity
        if otp and otp.expiry_date < timezone.now():
            if clean:
                otp.delete()
            raise ValidationError("OTP expired")

        return otp

    @staticmethod
    def get_jwttokens_for_user(user):
        token = OTPTokenObtainPairSerializer.get_token(user)

        return {
            "refresh": str(token),
            "access": str(token.access_token),
        }

    @staticmethod
    def login(request_obj: Request):
        """ Attempts to login a user."""
        user = User.objects.get(email=request_obj.data.get("email"))

        # Login if less than 3 attempts
        if user.login_attempts <= 3:
            print("Login attempt")
            token_verified = AccountsService.validate_otp(request_obj)

            if token_verified:
                print("token verified")
                tokens = AccountsService.get_jwttokens_for_user(user)
                reset_login_attempts(user)
                clear_user_otps(user)
                update_last_login(None, user)
                return tokens

            else:
                increment_login_attempts(user)
                raise ValidationError("Invalid OTP")

        # Else, too many attempts registered
        else:
            print("Too many attempts")
            clear_user_otps(user)
            reset_login_attempts(user)
            raise ValidationError("Too many invalid OTPs")
