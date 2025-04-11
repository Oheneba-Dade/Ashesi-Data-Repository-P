from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

User = get_user_model()

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    model = User
    list_display = [field.name for field in User._meta.fields]
    ordering = ('email',)
    search_fields = ('email',)

    def get_fieldsets(self, request, obj=None):
        fields = [field.name for field in self.model._meta.fields if field.name != 'password']
        return (
            (None, {'fields': ('password',)}),
            (_('User info'), {'fields': fields}),
        )

    def get_add_fieldsets(self, request):
        fields = [field.name for field in self.model._meta.fields if field.name not in ('id', 'last_login')]
        return (
            (None, {
                'classes': ('wide',),
                'fields': fields + ['password1', 'password2'],
            }),
        )
