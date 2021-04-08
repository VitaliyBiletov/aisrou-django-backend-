from django.conf import settings
from django.urls import path, include
from django.views.decorators.cache import never_cache
from django.views.static import serve

from .views import index, SDLoginView, SDLogoutView, ChangeUserInfoView

app_name = 'main'
urlpatterns = [
    path('', index, name='index'),
    path('accounts/login/', SDLoginView.as_view(), name='login'),
    path('accounts/logout/', SDLogoutView.as_view(), name='logout'),
    path('accounts/profile/change/<int:id>', ChangeUserInfoView.as_view(), name='profile_change')
]

if settings.DEBUG:
    urlpatterns.append(path('static/<path:path>', never_cache(serve)))
