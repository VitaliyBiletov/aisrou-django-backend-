from django.conf import settings
from django.urls import path, include
from django.views.decorators.cache import never_cache
from django.views.static import serve

from .views import index, SDLoginView, SDLogoutView, logout_view, diagnostic_view, add_diagnostic_view, save_diagnostic_view

app_name = 'main'
urlpatterns = [
    path('', index, name='index'),
    path('diagnostic/', diagnostic_view, name='diagnostic'),
    path('diagnostic/create/', add_diagnostic_view, name='add_diagnostic'),
    path('diagnostic/save/', add_diagnostic_view, name='save_diagnostic'),
    path('accounts/login/', SDLoginView.as_view(), name='login'),
    path('accounts/logout/', logout_view, name='logout'),
]

if settings.DEBUG:
    urlpatterns.append(path('static/<path:path>', never_cache(serve)))
