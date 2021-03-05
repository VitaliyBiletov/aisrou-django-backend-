from django.shortcuts import render, redirect
from .forms import UserRegistrationForm, PupilRegistrationForm
from main.models import Pupil


# Create your views here.
def index(request):
    return render(request, 'admin_panel/index.html', {'title': 'Администратор'})


def users(request):
    if request.user.is_staff:
        if request.method == "POST":
            user_form = UserRegistrationForm(request.POST)
            if user_form.is_valid():
                new_user = user_form.save(commit=False)
                new_user.set_password(user_form.cleaned_data['password'])
                new_user.save()
                return render(request, 'main/register_done.html', {'new_user': new_user})
        else:
            user_form = UserRegistrationForm()
        return render(request, 'admin_panel/users_registration.html', {'user_form': user_form})
    else:
        return redirect('/')


def pupils(request):
    if request.user.is_staff:
        list_pupils = Pupil.objects.all()
        if request.method == "POST":
            pupil_form = PupilRegistrationForm(request.POST)
            if pupil_form.is_valid():
                new_pupil = pupil_form.save(commit=False)
                new_pupil.save()
                new_pupil_form = PupilRegistrationForm()
                return render(request, 'admin_panel/pupils_registration.html', {'new_pupil': new_pupil, 'pupil_registration_form': new_pupil_form,})
        else:
            pupil_form = PupilRegistrationForm()
        return render(request, 'admin_panel/pupils_registration.html', {'pupil_registration_form': pupil_form, 'pupils': list_pupils})
    else:
        return redirect('/')