from django.contrib.auth import logout
from django.contrib.auth.views import LoginView, LogoutView
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from admin_panel.models import LogoGroups, Pupil
from main.models import Diagnostics


@login_required
def index(request):
    if request.user.is_staff:
        return render(request, 'admin_panel/index.html')
    logo_group_for_user = LogoGroups.objects.filter(custom_user=request.user.id)
    diagnostics = Diagnostics.objects.all()
    return render(request, 'main/index.html', {
        'logo_group_for_user': logo_group_for_user,
        'diagnostics': diagnostics,
    })


class SDLoginView(LoginView):
    template_name = 'main/login.html'


def logout_view(request):
    logout(request)
    return redirect('/')


class SDLogoutView(LogoutView):
    template_name = "main/logout.html"


def diag(request):
    print(request.POST)
    pupil_id = request.POST['select_pupil']
    print(pupil_id)
    select_pupil = Pupil.objects.get(pk=pupil_id)
    return render(request, 'main/diagnostics.html', {'select_pupil': select_pupil})


def add_diag(request):
    print(request.POST)
    return redirect('/')

