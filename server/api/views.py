from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Register
from .serializer import RegisterSerializer, LoginSerializer
import json

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    data = request.data
    serializer = RegisterSerializer(data = data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token), 
        })
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    serializer = LoginSerializer(data = request.data)
    if serializer.is_valid():
        return Response(serializer.data, status = status.HTTP_202_ACCEPTED)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
        
    
        

