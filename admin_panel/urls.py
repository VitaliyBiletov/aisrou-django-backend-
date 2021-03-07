from django.urls import path, include
from . import views


urlpatterns = [
    path('admin_panel/', views.index, name='admin_panel'),
    path('users_registration/', views.users, name='users'),
    path('pupils_registration/', views.pupils, name='pupils'),
    path('groups/', views.groups, name='groups'),
    path('pupils_registration/delete/<int:id>/', views.delete)
]