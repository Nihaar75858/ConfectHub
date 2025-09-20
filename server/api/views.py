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
@permission_classes([permissions.IsAuthenticated])
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
        sweets = Sweets.objects.all()

        serializer = SweetSerializer(sweets, many=True)
        return Response({'sweets': serializer.data, 'count': len(serializer.data)})
        
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def sweet_search(request):
    filters = {}

    if name := request.query_params.get('name'):
        filters["name__icontains"] = name
    if category := request.query_params.get('category'):
        filters["category__icontains"] = category
    if price := request.query_params.get('price'):
        filters["price"] = price

    sweets = Sweets.objects.filter(**filters)
    serializer = SweetSerializer(sweets, many=True)
    return Response({'sweets': serializer.data})

# def test_sweet_purchase_failure(purchase, sweet_id):
#     sweet = Sweets.object.get(id = sweet_id)
#     if(sweet == null):
#         assert purchase.status_code == 400
#         assert purchase.json == {"message": "Sweet not found"}
        
#     if(purchase < 0 or purchase is not number):
#         assert purchase.status_code == 406
#         assert purchase.json == {"message": "Value should be positive numeric"}

#     quantity = Sweets.data.get("quantity", 0)
    
#     if(quantity < purchase):
#         assert purchase.status_code == 400
#         assert purchase.json == {"message": "Not enough sweet"}
        
@api_view(['PUT'])
@permission_classes([permissions.IsAuthenticated])
def sweet_purchase(purchase, sweet_id):
    try: 
        sweet = Sweets.objects.get(id = sweet_id)
    except Sweets.DoesNotExist():
        return Response({
            "error": "Sweet not found"
        }, status=status.HTTP_400_BAD_REQUEST)
    
    purchase_quantity = purchase.data.get("quantity", 0)
    
    if not isinstance(purchase_quantity, int) or purchase_quantity <= 0:
        return Response({"error": "Invalid purchase quantity"}, status=status.HTTP_400_BAD_REQUEST)
    
    if sweet.quantity < purchase_quantity:
        return Response({"error": "Not enough stock"}, status=status.HTTP_400_BAD_REQUEST)
    
    sweet.quantity -= purchase_quantity
    sweet.save()
    
    serializer = SweetSerializer(sweet)
    return Response({
        "message": "Purchase Successful",
        "sweet": serializer.data
    }, status=status.HTTP_200_OK)
    
    
    

