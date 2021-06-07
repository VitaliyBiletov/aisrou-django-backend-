from django.conf import settings
from django.urls import path, include
from django.views.decorators.cache import never_cache
from django.views.static import serve

from .views import index, list_diagnostics,SDLoginView, \
    delete_diagnostic_view, logout_view, create_diagnostic_view,\
    save_diagnostic_view

app_name = 'main'
urlpatterns = [
    path('', index, name='index'),
    path('diagnostic/create/', create_diagnostic_view, name='create_diagnostic'),
    path('diagnostic/list/', list_diagnostics, name='list_diagnostics'),
    path('diagnostic/delete/', delete_diagnostic_view, name='delete_diagnostics'),
    path('diagnostic/', save_diagnostic_view, name='save_diagnostic'),
    path('accounts/login/', SDLoginView.as_view(), name='login'),
    path('accounts/logout/', logout_view, name='logout'),
]

if settings.DEBUG:
    urlpatterns.append(path('static/<path:path>', never_cache(serve)))
