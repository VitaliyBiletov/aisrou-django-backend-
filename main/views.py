from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib.messages.views import SuccessMessageMixin
from django.shortcuts import render
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


class ChangeUserInfoView(SuccessMessageMixin, LoginRequiredMixin, UpdateView):
    model = CustomUser
    template_name = 'main/change_user_info.html'
    success_url = reverse_lazy('/')
    success_message = 'Данные изменены'

    def dispatch(self, request, id, *args, **kwargs):
        print(request.POST)
        print(id)
        return super().dispatch(request, *args, **kwargs)