from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Register, Sweets
from .serializer import RegisterSerializer, LoginSerializer, SweetSerializer
from .permissions import IsAdmin, IsAdminOrReadOnly
import json

# AUTHORISATION
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
    print("Data from frontend", request.data) 
    if serializer.is_valid():
        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

# SWEETS (PROTECTED)
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

@api_view(['PUT', 'DELETE'])
@permission_classes([AllowAny])
def update_delete_sweet_details(request, sweet_id):
    if request.method == 'PUT':
        try:
            sweet = Sweets.objects.get(id = sweet_id)
        except Sweets.DoesNotExist():
            return Response({
                "error": "Sweet does not exist",
            }, status = status.HTTP_404_NOT_FOUND)
        
        serializer = SweetSerializer(sweet, data = request.data, partial = True)
        
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": 'Sweet Details Updated Successfully',
                "sweet": serializer.data
            }, status = status.HTTP_200_OK)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        try: 
            sweet = Sweets.objects.get(id = sweet_id)
            sweet.delete()
            return Response({
                "message": "Sweet is successfully deleted."
            }, status = status.HTTP_204_NO_CONTENT)
        except Sweets.DoesNotExist:
            return Response({
                "error": "Sweet Not Found"
            }, status = status.HTTP_404_NOT_FOUND)

# INVENTORY (PROTECTED)        
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def sweet_purchase(request, sweet_id):
    try: 
        sweet = Sweets.objects.get(id = sweet_id)
    except Sweets.DoesNotExist():
        return Response({
            "error": "Sweet not found"
        }, status=status.HTTP_400_BAD_REQUEST)
        
    quantity = request.data.get('quantity', 1) 
    
    if not isinstance(quantity, int) or quantity <= 0:
        return Response({"error": "Invalid purchase quantity"}, status=status.HTTP_400_BAD_REQUEST)
    
    if sweet.quantity < quantity:
        return Response({"error": "Not enough stock"}, status=status.HTTP_400_BAD_REQUEST)
    
    sweet.quantity -= quantity
    sweet.save()
    
    serializer = SweetSerializer(sweet)
    return Response({
        "message": "Purchase Successful",
        "sweet": serializer.data
    }, status=status.HTTP_200_OK)
    
# @path(['/api/sweets/:id/restock', 'POST'])
# def test_restock_sweet_success(request, sweetId):
#     sweet = db.objects.get(id = sweetId)
    
#     quantity_to_add = request.data.get("quanity", 0)
    
#     sweet.quantity += quantity_to_add
#     sweet.save()
    
#     assert response.status_code == 200
#     assert response.json == {"message": "Sweet Restocked successfully."}
    
# def test_restock_sweet_success(request, sweetId):
#     if db.objects.get(id = sweetId) does not exist:
#         assert response.status_code == 400
#         assert response.json == {"message": "Sweet not found."}
        
#     if quantity <= 0:
#         assert response.status_code == 400
#         assert response.json == {"message": "Quantity must be greater than 0."}
    
#     assert response.status_code == 400
#     assert response.json == {"message": "Sweet is not Restocked."}
    
@api_view(['POST'])
def sweet_restock(request, sweet_id):
    try:
        sweet = Sweets.objects.get(id = sweet_id)
    except Sweets.DoesNotExist():
        return Response({
            "error": "Sweet not found"
        }, status=status.HTTP_400_BAD_REQUEST)
    
    quantity_to_add = request.data.get("quantity", 0)
    
    if quantity_to_add <= 0:
        return Response({
            "error": "Quantity must be positive"},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    sweet.quantity += quantity_to_add
    sweet.save()

    return Response({
        "message": "Restock Successful",
        "sweet": sweet.name,
        "quantity_added": quantity_to_add,
        "new_stock": sweet.quantity
    }, status = status.HTTP_200_OK)
