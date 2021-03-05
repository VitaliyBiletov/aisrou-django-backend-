from django.urls import path
from . import views


urlpatterns = [
    path('admin_panel/', views.index, name='admin_panel'),
    path('users_registration/', views.users, name='users'),
    path('pupils_registration/', views.pupils, name='pupils')
]