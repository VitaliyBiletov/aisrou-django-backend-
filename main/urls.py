from django.conf import settings
from django.urls import path, include
from django.views.decorators.cache import never_cache
from django.views.static import serve

from .views import index, SDLoginView, SDLogoutView, logout_view, add_diag, diag

app_name = 'main'
urlpatterns = [
    path('', index, name='index'),
    path('diag/', diag, name='diag'),
    path('diag/add/', add_diag, name='add_diag'),
    path('accounts/login/', SDLoginView.as_view(), name='login'),
    path('accounts/logout/', logout_view, name='logout'),
]

if settings.DEBUG:
    urlpatterns.append(path('static/<path:path>', never_cache(serve)))
