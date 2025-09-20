from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Register, Sweets
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

@api_view(['GET', 'POST'])
@permission_classes([permissions.isAuthenticated])
def sweets_list_create(request):
    if request.method == 'POST':
        if not (request.user.is_authenticated and request.user.role == 'admin'):
            return Response(
                {'error': 'Admin access required'},
                status=status.HTTP_403_FORBIDDEN
            )
            
        serializer = SweetSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'message': 'Sweet added successfully',
                'sweet': serializer.data
            }, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'GET':
        filters = {}

        if name := request.query_params.get('name'):
            filters["name__icontains"] = name
        if category := request.query_params.get('category'):
            filters["category__icontains"] = category
        if price := request.query_params.get('price'):
            filters["price"] = price

        sweets = Sweets.objects.filter(**filters)
        serializer = SweetSerializer(sweets, many=True)
        return Response({'sweets': serializer.data, 'count': len(serializer.data)})

@path(['/api/sweets/search'])    
def test_search_sweets_success(request):
    if(request == name or request == category or request == price):
        assert sweet = Sweets.objects.filter(name or category or price)
        
    reponse = SweetSerializer(sweet, many = True)
    assert response.status == 200
    assert response.json == ({'message': 'Sweet successfully filtered'})
    
def test_search_sweets_failure(request):
    if not (request == name or request == category or request == price):
        assert response.status == 400
        assert response.json == ({'message': 'Sweet not found'})
