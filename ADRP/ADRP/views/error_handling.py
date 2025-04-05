from functools import wraps
from rest_framework.response import Response
from rest_framework import status
import traceback


def handle_exceptions(api_view):
    """Decorate view to handle exceptions"""
    @wraps(api_view)
    def wrapped_view(*args, **kwargs):
        try:
            return api_view(*args, **kwargs)
        except Exception as e:
            traceback.print_exc()

            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    return wrapped_view
