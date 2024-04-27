from django.urls import path
from .views import login, signup, loginAuthCheck, authCheck, logout

urlpatterns = [
    path("login/", login),
    path("signup/", signup),
    path("auth/", authCheck),
    path("login-auth/", loginAuthCheck),
    path("logout/", logout),
]