from django.urls import path
from .views import register, login, sweets_list_create, sweet_search, sweet_purchase, update_delete_sweet_details
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('auth/register/', register, name='register'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/login/', login, name='login'),
    path('sweets/', sweets_list_create, name='sweets_list_create'),
    path('sweets/search/', sweet_search, name='sweet_search'),
    path('sweets/<int:sweet_id>/purchase/', sweet_purchase, name='sweet_purchase'),
    path('sweets/<int:sweet_id>', update_delete_sweet_details, name='update_sweet_details'),
]