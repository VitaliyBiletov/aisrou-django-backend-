from django.conf import settings
from django.urls import path, include
from django.conf.urls import url
from django.conf.urls.static import static
from django.views.decorators.cache import never_cache
from django.views.static import serve

from .views import index, list_diagnostics, SDLoginView, \
    delete_diagnostic_view, logout_view, load_data, open_diagnostic_view, diagnostic_view, \
    save_diagnostic_view, edit_diagnostic_view, list_pupils_view, list_diags_view, load_pictures

app_name = 'main'
urlpatterns = [
    path('', index, name='index'),
    path('list_pupils/', list_pupils_view, name='list-pupils'),
    path('list_diags/', list_diags_view, name='list-diags'),
    # url(r'^diagnostic/edit/(?P<id>[0-9]+)/$', edit_diagnostic_view, name='edit_diagnostic'),
    url(r'^diagnostic/load-pictures/(?P<id>[0-9]+)/$', load_pictures),
    url(r'^diagnostic/load-data$', load_data),
    url(r'^diagnostic/save$', save_diagnostic_view, name='save_diagnostic'),
    url(r'^diagnostic/delete$', delete_diagnostic_view, name='delete_diagnostic'),
    url(r'^(?P<diag_type>edit)/(?P<diag_id>[0-9]+)/$', diagnostic_view, name='diagnostic'),
    url(r'^(?P<diag_type>create)/$', diagnostic_view, name='diagnostic'),
    path('diagnostic/list/', list_diagnostics, name='list_diagnostics'),
    path('diagnostic/delete/', delete_diagnostic_view, name='delete_diagnostics'),
    path('accounts/login/', SDLoginView.as_view(), name='login'),
    path('accounts/logout/', logout_view, name='logout'),
]


if settings.DEBUG:
    urlpatterns.append(path('static/<path:path>', never_cache(serve)))

