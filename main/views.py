from django.contrib.auth import logout
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib.messages.views import SuccessMessageMixin
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import sessions
from django.urls import reverse_lazy
from django.views.generic import UpdateView

from admin_panel.models import LogoGroups
from main.models import CustomUser, Diagnostics


@login_required
def index(request):
    if request.user.is_staff:
        return render(request, 'admin_panel/index.html')
    logo_group_for_user = LogoGroups.objects.filter(custom_user=request.user.id)
    diagnostics = Diagnostics.objects.all()
    print(logo_group_for_user)
    return render(request, 'main/index.html', {
        'logo_group_for_user': logo_group_for_user,
        'diagnostics': diagnostics
    })


class SDLoginView(LoginView):
    template_name = 'main/login.html'


def logout_view(request):
    logout(request)
    return redirect('/')


class SDLogoutView(LogoutView):
    template_name = "main/logout.html"

