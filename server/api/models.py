from djongo import models

# Create your models here.
class Register(models.Model):
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=100)
    email = models.EmailField(max_length=60)
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=120)
    role = models.CharField(max_length=50, default='user')
    
    def __str__(self):
        return self.username
