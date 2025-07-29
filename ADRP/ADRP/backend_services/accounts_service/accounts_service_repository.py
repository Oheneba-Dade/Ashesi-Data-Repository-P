from django.utils import timezone
from ..statistics_service.statistics_service_repository import get_all_stats

from ...models import OTP, User, Statistics


def create_new_otp(user, otp, lifetime) -> OTP:
    """Creates a new secure OTP for a user.
    :param user: The user to create the OTP for.
    :param otp: The OTP string to insert into the db
    :param lifetime: The lifetime(min) of the OTP."""
    now = timezone.now()

    new_otp = OTP(user=user,
                  life_time_mins=lifetime,
                  otp=otp,
                  created_at=now,
                  expiry_date=now + timezone.timedelta(minutes=lifetime))

    new_otp.save()
    return new_otp


def user_exists_by_email(email) -> bool:
    """Checks if a user exists based on the provided email."""
    exists = User.objects.filter(email=email).exists()

    return exists


def check_otp_valid(otp, user_email) -> OTP | None:
    """Check if OTP within time limit and belongs to requesting user"""

    valid_otp = OTP.objects.filter(
        user__email=user_email,
        expiry_date__gt=timezone.now(),
        otp=otp,
        attempts__lte=3
    ).first()

    return valid_otp


def get_otp(otp, email) -> OTP:
    """ Gets an OTP entry. In other words, check if supplied OTP is associated with user  """
    return OTP.objects.filter(otp=otp, user__email=email).first()


def reset_login_attempts(user: User):
    """ Reset the numnber of login attempts from a user"""
    user.login_attempts = 0
    user.save()
    return user


def increment_login_attempts(user: User):
    """ Increment the number of login attempts from a user by 1"""
    user.login_attempts += 1
    user.save()
    return user


def clear_user_otps(user: User):
    """ Deletes all OTP entries associated with user"""
    OTP.objects.filter(user=user).delete()
    print("deleting all OTP entries associated with user")
    return user

def increment_global_user_count():
    """Increments the global user counter for the app"""

    stats = get_all_stats()
    stats.user_count += 1
    stats.save()

    return stats
