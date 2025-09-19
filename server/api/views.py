from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Register
from .serializer import RegisterSerializer, LoginSerializer, SweetSerializer
from .permissions import IsAdmin, IsAdminOrReadOnly
import json

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    data = request.data
    print("Data from frontend:", data)
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
@permission_classes([AllowAny])
def login(request):
    serializer = LoginSerializer(data = request.data)
    if serializer.is_valid():
        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAdmin])
def sweets(request):
    serializer = SweetSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'message': 'Sweet added successfully',
            'sweet': serializer.data
        }, status = status.HTTP_201_CREATED)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

def test_sweets_list_success(request):
    assert Sweet.objects.filter()
    
    if sweets is available:
        assert response.status == 200
        assert response.json == data
        
def test_sweets_list_failure(request):
    if user is not authenticated:
        assert response.status == 400
        assert response.message == "User is not authenticated"
    assert response.status == 200
    assert response.json == {"message": "Sweets were not found"}

