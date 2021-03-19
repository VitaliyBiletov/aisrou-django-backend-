from django.urls import path, include
from django.conf.urls import url
from . import views


urlpatterns = [
    path('admin_panel/', views.index, name='admin_panel'),
    path('users/', views.users, name='users'),
    path('users/add', views.add_user, name='add_user'),
    path('users/edit/<int:id>/', views.edit_user, name='edit_user'),
    path('users/delete/<int:id>/', views.delete_user, name='delete_user'),
    path('pupils_registration/', views.pupils, name='pupils'),
    path('pupils_registration/delete/<int:id>/', views.delete),
    path('groups/', views.groups, name='groups'),
    path('groups/view/', views.groups_view, name='view'),
    path('groups/attachment/', views.groups_attachment, name='attachment'),
    path('groups/unpin/<int:id>/', views.unpin),
]