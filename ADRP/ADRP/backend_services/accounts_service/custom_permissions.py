from rest_framework.permissions import BasePermission


class IsInternalAdmin(BasePermission):
    """ Permission check to ensure a user is an admin"""
    message = 'User must be an internal administrator'

    def has_permission(self, request, view):
        if request.user and request.user.is_authenticated and request.user.role == 'admin':
            return True


class IsInternalUser(BasePermission):
    """Permission to ensure a user is an internal user or admin"""
    message = 'User must be an internal user'

    def has_permission(self, request, view):
        return (
            request.user and
            request.user.is_authenticated and
            request.user.role in {'internal', 'admin'}
        )

class ExternalUser(BasePermission):
    """ Permission check to ensure a user is an external user (not an ashesi based address)"""

    def has_permission(self, request, view):
        if request.user and request.user.is_authenticated and request.user.role == 'external':
            return True
        return False
