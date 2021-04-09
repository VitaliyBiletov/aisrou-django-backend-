from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib.messages.views import SuccessMessageMixin
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.urls import reverse_lazy
from django.views.generic import UpdateView
from main.models import CustomUser


@login_required
def index(request):
    if request.user.is_staff:
        return render(request, 'admin_panel/index.html')
    return render(request, 'main/index.html')


class SDLoginView(LoginView):
    template_name = 'main/login.html'


class SDLogoutView(LogoutView):
    template_name = 'main/logout.html'