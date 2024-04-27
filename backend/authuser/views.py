from django.urls import reverse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import AppUserSerializer
from rest_framework import status
from .models import AppUser

from django.shortcuts import get_object_or_404, redirect
import jwt
from .view_utils import set_jwt 

from django.conf import settings


# Create your views here.



@api_view(["POST"])
def login(request):
    user = get_object_or_404(AppUser, email=request.data["email"])
    if not user.check_password(request.data["password"]):
        return Response({"message": "Invalid password", "data": request.data}, status=status.HTTP_400_BAD_REQUEST) 
    serializer = AppUserSerializer(instance=user)

    return set_jwt(user.id, serializer)



@api_view(["GET"])
def authCheck(request):
    token, res, token_delet = _checkAuth(request)
    
    response = Response(res, status = status.HTTP_200_OK if token else status.HTTP_401_UNAUTHORIZED)
    if token_delet:
        response.delete_cookie("user-access")
    
    return response
@api_view(["GET"])
def loginAuthCheck(request):
    token, res, token_delet = _checkAuth(request)
    
    response = Response(res, status = status.HTTP_200_OK if not token else status.HTTP_401_UNAUTHORIZED)
    if token_delet:
        response.delete_cookie("user-access")
    
    return response


def _checkAuth(request):
    token = request.COOKIES.get("user-access")
    if not token:
        return False, {"message": "no_token"}, None
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
    except (jwt.ExpiredSignatureError, jwt.DecodeError, jwt.InvalidTokenError) as e:
        return False, {"message": "ExpiredToken or InvalidToken"}, True

    try:
        user = get_object_or_404(AppUser, id=payload["user_id"])
        serializer = AppUserSerializer(user)
    except Exception as e:
        return False, {"message": "User not found"}, None
    return True, {"message": "login success"}, None

@api_view(["POST"])
def signup(request):
    # cheack if user exists
    # if AppUser.objects.filter(email=request.data["email"]).exists():
    #     return Response({"error": "User already exists"}, status=status.HTTP_400_BAD_REQUEST)
    # else:
    serializer = AppUserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        if user:
            return set_jwt(user.id, serializer)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def logout(request):
    response = Response()
    response.delete_cookie("user-access")
    response.data = {
        "message": "logout success"
    }
    return response

