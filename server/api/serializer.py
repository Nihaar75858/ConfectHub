from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import Register, Sweets

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Register
        fields = ('firstName', 'lastName', 'email', 'username', 'password', 'role')
        extra_kwargs = {'password': {'write_only': True}}
        
    def create(self, validated_data):
        return Register.objects.create_user(**validated_data)
    
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    
    def validate(self, data):
        user = authenticate(username=data['email'], password=data['password'])
        if not user:
            raise serializers.ValidationError('Invalid credentials')
        data['user'] = user
        return data
    
class SweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sweets
        fields = '__all__'
        