from djongo import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class Register(AbstractUser):
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=100)
    email = models.EmailField(max_length=60, unique=True)
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=120)
    role = models.CharField(max_length=50, default='user')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']
    
    def __str__(self):
        return self.email
