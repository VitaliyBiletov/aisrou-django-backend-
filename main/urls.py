from django.conf import settings
from django.urls import path, include
from django.conf.urls import url
from django.views.decorators.cache import never_cache
from django.views.static import serve

from .views import index, list_diagnostics, SDLoginView, \
    delete_diagnostic_view, logout_view, create_diagnostic_view, diagnostic_view, \
    save_diagnostic_view, edit_diagnostic_view, list_pupils_view, list_diags_view

app_name = 'main'
urlpatterns = [
    path('', index, name='index'),
    path('list_pupils/', list_pupils_view, name='list-pupils'),
    path('list_diags/', list_diags_view, name='list-diags'),
    url(r'^diagnostic\/save$', save_diagnostic_view, name='save_diagnostic'),
    url(r"^diagnostic\/.+$", diagnostic_view),
    path('diagnostic/', diagnostic_view, name='diagnostic'),
    path('diagnostics/edit', edit_diagnostic_view, name='edit_diagnostic'),
    path('diagnostics/create', create_diagnostic_view, name='create_diagnostic'),
    path('diagnostic/list/', list_diagnostics, name='list_diagnostics'),
    path('diagnostic/delete/', delete_diagnostic_view, name='delete_diagnostics'),
    path('accounts/login/', SDLoginView.as_view(), name='login'),
    path('accounts/logout/', logout_view, name='logout'),
]

if settings.DEBUG:
    urlpatterns.append(path('static/<path:path>', never_cache(serve)))
