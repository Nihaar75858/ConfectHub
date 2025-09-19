from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Register
from .serializer import RegisterSerializer
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

def test_login_success(user):
    user = server.post('/login',json.dumps({"username": "John",
                               "password": "secret"
                               }),
                           content_type = "application/json")
    
    db.session.log(user)
    db.session.commit
    
    assert user.status_code == 200
    assert user.json == {"message": "Registration successful"}
    
def test_login_failure(user):
    if(user.password != RegisterSerializer.validated_data['password'] or 
       user.email != RegisterSerializer.validated_data['email']):
        assert status_code == 400
        assert "Please enter proper password or email"
        
    
        

