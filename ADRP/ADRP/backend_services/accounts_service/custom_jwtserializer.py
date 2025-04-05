from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class OTPTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Custom serializer class which is used to generate the JWT for the custom passwordless auth"""

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role'] = user.role
        return token
