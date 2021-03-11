from django.urls import path, include
from django.conf.urls import url
from . import views


urlpatterns = [
    path('admin_panel/', views.index, name='admin_panel'),
    path('users_registration/', views.users, name='users'),
    path('pupils_registration/', views.pupils, name='pupils'),
    url(r'^\w+_registration/delete/(?P<id>\d+)/', views.delete),
    path('groups/', views.groups, name='groups'),
    path('groups/view/', views.groups_view, name='view'),
    path('groups/attachment/', views.groups_attachment, name='attachment'),
    path('groups/unpin/<int:id>/', views.unpin),
]