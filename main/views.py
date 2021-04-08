from django.contrib.auth.views import LoginView, LogoutView
from django.shortcuts import render
from django.contrib.auth.decorators import login_required


@login_required
def index(request):
    # if request.user.is_staff:
    #     return render(request, 'admin_panel/index.html')
    return render(request, 'main/index.html')


class SDLoginView(LoginView):
    template_name = 'main/login.html'


class SDLogoutView(LogoutView):
    template_name = 'main/logout.html'