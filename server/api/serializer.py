from rest_framework import serializers
from .models import Register

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Register
        fields = ('firstName', 'lastName', 'email', 'username', 'password', 'role')
        extra_kwargs = {'password': {'write_only': True}}
        
    def create(self, validated_data):
        return Register.objects.create_user(**validated_data)
        