from django.urls import path
from .views import register, login, sweets
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('auth/register/', register, name='register'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/login/', login, name='login'),
    path('sweets/', sweets, name='sweets')
]