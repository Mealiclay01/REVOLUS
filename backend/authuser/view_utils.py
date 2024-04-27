
import jwt, datetime
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings


def set_jwt(user_id: int, serializer):
    payload = {
    "user_id": user_id,
    "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1),
    "iat": datetime.datetime.utcnow()
    }
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")
    response =  Response({"user": serializer.data, "jwt": token}, status=status.HTTP_200_OK)
    response.set_cookie("user-access", token, httponly=True)
    return response