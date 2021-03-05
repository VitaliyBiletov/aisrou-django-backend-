from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User


@login_required
def index(request):
    if request.user.is_authenticated and request.user.is_staff:
        return render(request, 'admin_panel/index.html', {'title': 'Администратор'})

    # if request.user.is_authenticated and not request.user.is_staff:
    #     return render(request, 'main/index.html', {'title': 'Пользователь'})
    #
    # if not request.user.is_authenticated:
    return render(request, 'main/index.html')


def about_as(request):
    return render(request, 'main/about.html')


def login(request):
    return render(request, 'registration/login.html')
