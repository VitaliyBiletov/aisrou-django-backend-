from django.conf import settings
from django.urls import path
from django.conf.urls import url
from django.views.decorators.cache import never_cache
from django.views.static import serve

from .views import pupils, SDChangePupilInfoView, \
    SDPupilRegisterView, SDChangeUserInfoView, \
    SDRegisterUserView, set_password, delete_user, users
forms_template = {
    'add': 'admin_panel/user_form_add.html',
    'edit': 'admin_panel/user_form_edit.html',
}

app_name = 'admin_panel'
urlpatterns = [
    path('users/', users, name='users'),
    path('accounts/profile/change/<int:id>/', SDChangeUserInfoView.as_view(), name='profile_change'),
    path('accounts/profile/set_password/<int:id>/', set_password, name='set_password'),
    path('accounts/register/', SDRegisterUserView.as_view(), name='register'),
    path('accounts/profile/delete/<int:id>/', delete_user, name='delete'),

    # path('users/add/', views.edit_user, {'tmplt_name': forms_template['add']}, name='add_user'),
    # path('users/edit/<int:id>/', views.edit_user, {'tmplt_name': forms_template['edit']}, name='edit_user'),
    # path('users/delete/<int:id>/', views.delete_user, name='delete_user'),
    path('pupils/', pupils, name='pupils'),
    path('pupils/add/', SDPupilRegisterView.as_view(), name='pupil_register'),
    path('pupils/change/<int:id>/', SDChangePupilInfoView.as_view(), name='pupil_change'),
    # path('pupils_registration/delete/<int:id>/', views.delete),
    # path('groups/', views.groups, name='groups'),
    # path('groups/view/', views.groups_view, name='view'),
    # path('groups/attachment/', views.groups_attachment, name='attachment'),
    # path('groups/unpin/<int:id>/', views.unpin),
]

if settings.DEBUG:
    urlpatterns.append(path('static/<path:path>', never_cache(serve)))