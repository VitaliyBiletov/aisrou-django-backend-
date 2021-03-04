from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('about', views.about_as, name='about'),
    path('registration', views.registration, name='registration'),
    path('pupils', views.pupils, name='pupils')
]
urlpatterns += [
    path('account/', include('django.contrib.auth.urls')),
]