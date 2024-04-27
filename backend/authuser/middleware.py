from django.shortcuts import redirect
from django.urls import reverse
# from jwt import decode, ExpiredSignature, DecodeError, InvalidTokenError
from jwt import decode, ExpiredSignatureError, DecodeError, InvalidTokenError  # Update import statement
from rest_framework import status
from rest_framework.response import Response
from django.conf import settings
from .models import AppUser


class JWTMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
    def __call__(self, request):
        self.auth(request)
        return self.get_response(request)
    
    def auth(self,request):
        exclusion_list = ['/api/v1/signup/','/api/v1/login/']
        if request.path not in exclusion_list:
            try:
                urlstr = request.path
                user = urlstr.split('/')[1]
                payload = self._get_payload(request)
                userObj = AppUser.objects.get(username=user)
                if payload.get('username') == userObj.username:
                    return True
                else:
                    return False
            except (ExpiredSignatureError, DecodeError, InvalidTokenError) as e:
                error = {'Error_code': status.HTTP_403_FORBIDDEN,
                                'Error_Message': "Token is Invalid/Expired"}
                # logger.error(e)
                # raise PermissionError(error)
                return Response(error, status=status.HTTP_403_FORBIDDEN)
            except Exception as e:
                error = {'Error_code': status.HTTP_403_FORBIDDEN,
                                'Error_Message': "Invalid User"}
                # logger.error(e) 
                return Response(error, status=status.HTTP_403_FORBIDDEN)
                # raise PermissionError(error) 
        else:
            return True
        
    def _get_payload(self, request):
        return decode(request.COOKIES['user-access'], settings.SECRET_KEY, algorithms=['HS256'])
    
#     def __init__(self, get_response):
#         self.get_response = get_response

#     def __call__(self, request):
#         response = self.get_response(request)
#         print("-> OK")
#         print(response)
#         print(request.path)
#         return response
#         # return Response({"url": request.path}) 
#         # if request.path in ['/api/v1/login/', '/api/v1/signup/']:
#         #     if 'user-access' in request.COOKIES:  # Assuming you're storing JWT in cookies
#         #         try:
#         #             decoded_token = decode(request.COOKIES['user-access'], settings.SECRET_KEY, algorithms=['HS256'])
#         #             # Check if token is valid

#         #             # You may perform additional checks here (e.g., user permissions)
#         #             return redirect(reverse('admin'))  # Redirect to home if valid token and accessing login/signup
#         #         except ExpiredSignatureError:
#         #             return redirect(reverse('login'))  # Redirect to login if token expired
#         #         except:
#         #             pass  # Handle other JWT decoding errors here if necessary
#         #     else:
#         #         return self.get_response(request)

#         # elif not request.path.startswith('/admin/'):
#         #     if 'user-access' in request.COOKIES:  # Assuming you're storing JWT in cookies
#         #         try:
#         #             decoded_token = decode(request.COOKIES['user-access'], settings.SECRET_KEY, algorithms=['HS256'])
#         #             # Check if token is valid
#         #             # You may perform additional checks here (e.g., user permissions)
#         #             # return redirect(reverse('/'))
#         #         except ExpiredSignatureError:
#         #             return redirect(reverse('login'))  # Redirect to login if token expired
#         #         except:
#         #             pass  # Handle other JWT decoding errors here if necessary
#         #     else:
#         #         return redirect(reverse('login'))  # Redirect to login if no token present
#         # return self.get_response(request)
