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

def test_add_sweet_success(client):
    sweet = Sweet(
        "name": "Milk Chocolate Bar",
        "category": "Chocolate",
        "price": "₹150",
        "quantity": "100",
        "description": "Smooth and creamy milk chocolate, perfect for gifting or snacking."
    )
    
    db.session.add(sweet)
    db.session.commit()
    
    response = client.post("/sweets/", ({
        "name": "Milk Chocolate Bar",
        "category": "Chocolate",
        "price": "₹150",
        "quantity": "100",
        "description": "Smooth and creamy milk chocolate, perfect for gifting or snacking."
    }), content_type = 'application/json')
    
    assert response.status_code == 200
    assert response.json == {"message": "Sweet added"}
        
def test_add_sweet_failure(client):
    response = client.post("/sweets/", ({
        "name": "Milk Chocolate Bar",
        "category": "Chocolate",
        "price": "₹150",
        "quantity": "100",
        "description": "Smooth and creamy milk chocolate, perfect for gifting or snacking."
    }), content_type = 'application/json')
    
    assert response.status_code == 400
    assert response.json == {"message": "Sweet not added"}
    
        

