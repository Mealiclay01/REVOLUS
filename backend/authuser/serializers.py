from rest_framework import serializers
from .models import AppUser


class AppUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        min_length=6, write_only=True, required=True)
    class Meta:
        model = AppUser
        fields = ["email", "password", "first_name", "last_name", "phone_number", "city"]
        extra_kwargs = {
            "password": {"write_only": True}
        }
    def create(self, validated_data):
        """
        Create a new user with encrypted password and return it
        need to override the create method to hash the password
        refference:
        https://stackoverflow.com/questions/33674373/django-custom-user-model-password-is-not-being-hashed#answer-61204177
        """
        return AppUser.objects.create_user(**validated_data)
