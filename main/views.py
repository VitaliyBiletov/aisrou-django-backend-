from django.shortcuts import render
from .forms import UserRegistrationForm, PupilRegistrationForm
from django.contrib.auth.models import User
from django.contrib.auth.forms import AuthenticationForm


def index(request):
    username = request.user.username
    if request.user.is_authenticated and not request.user.is_staff:
        return render(request, 'main/index.html', {'title': 'Главная страница сайта', 'username': username})
    if request.user.is_authenticated and request.user.is_staff:
        return render(request, 'psi_admin/index.html', {'title': 'Администратор'})
    return render(request, 'main/index.html', {'title': 'Главная страница сайта', 'content': "Главная страница"})


def about_as(request):
    return render(request, 'main/about.html')


def login(request):
    return render(request, 'admin/login.html')


def registration(request):
    if request.method == "POST":
        user_form = UserRegistrationForm(request.POST)
        if user_form.is_valid():
            new_user = user_form.save(commit=False)
            new_user.set_password(user_form.cleaned_data['password'])
            new_user.save()
            return render(request, 'main/register_done.html', {'new_user': new_user})
    else:
        user_form = UserRegistrationForm()
    return render(request, 'main/registration.html', {'user_form': user_form})


def pupils(request):
    return render(request, 'psi_admin/pupils.html', {'pupil_registration_form': PupilRegistrationForm})
