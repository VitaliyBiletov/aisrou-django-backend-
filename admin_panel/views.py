from django.shortcuts import render, redirect
from .forms import UserRegistrationForm, PupilRegistrationForm
from .models import Pupil
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseRedirect


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
    list_pupils = Pupil.objects.all().order_by('last_name')
    paginator = Paginator(list_pupils, 5)
    page = request.GET.get('page')
    page_obj = paginator.get_page(page)
    try:
        contacts = paginator.page(page)
    except PageNotAnInteger:
        contacts = paginator.page(1)
    except EmptyPage:
        contacts = paginator.page(paginator.num_pages)

    if request.user.is_staff:
        if request.method == "POST":
            pupil_form = PupilRegistrationForm(request.POST)
            if pupil_form.is_valid():
                new_pupil = pupil_form.save(commit=False)
                new_pupil.save()
                new_pupil_form = PupilRegistrationForm()
                return render(request, 'admin_panel/pupils_registration.html', {'new_pupil': new_pupil, 'pupil_registration_form': new_pupil_form, "contacts": contacts, 'page_obj': page_obj})
        else:
            pupil_form = PupilRegistrationForm()
        return render(request, 'admin_panel/pupils_registration.html', {'pupil_registration_form': pupil_form, 'pupils': list_pupils, "contacts": contacts, 'page_obj': page_obj})
    else:
        return redirect('/')


def delete(request, id):
    pupil = Pupil.objects.get(id=id)
    pupil.delete()
    return redirect('/admin_panel/pupils_registration/')