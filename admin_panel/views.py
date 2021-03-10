from django.shortcuts import render, redirect
from .forms import UserRegistrationForm, PupilRegistrationForm, LogoGroupsForm
from .models import Pupil, LogoGroups
from django.contrib.auth.models import User
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseRedirect


# Create your views here.
def index(request):
    return render(
        request,
        'admin_panel/index.html',
        {'title': 'Администратор'}
    )


def users(request):
    if request.user.is_staff:
        if request.method == "POST":
            user_form = UserRegistrationForm(request.POST)
            if user_form.is_valid():
                new_user = user_form.save(commit=False)
                new_user.set_password(user_form.cleaned_data['password'])
                new_user.save()
                return render(
                    request,
                    'main/register_done.html', {'new_user': new_user})
        else:
            user_form = UserRegistrationForm()
        return render(
            request,
            'admin_panel/users_registration.html',
            {'user_form': user_form}
        )
    else:
        return redirect('/')


def pupils(request):
    list_pupils = Pupil.objects.all().order_by('last_name')
    paginator = Paginator(list_pupils, 5)
    page = request.GET.get('page')
    page_obj = paginator.get_page(page)
    try:
        list_pupils = paginator.page(page)
    except PageNotAnInteger:
        list_pupils = paginator.page(1)
    except EmptyPage:
        list_pupils = paginator.page(paginator.num_pages)

    if request.user.is_staff:
        if request.method == "POST":
            pupil_form = PupilRegistrationForm(request.POST)
            if pupil_form.is_valid():
                new_pupil = pupil_form.save(commit=False)
                new_pupil.save()
                new_pupil_form = PupilRegistrationForm()
                return render(
                    request,
                    'admin_panel/pupils_registration.html',
                    {
                        'new_pupil': new_pupil,
                        'pupil_registration_form': new_pupil_form,
                        'list_pupils': list_pupils,
                        'page_obj': page_obj
                    }
                )
        else:
            pupil_form = PupilRegistrationForm()
        return render(
            request,
            'admin_panel/pupils_registration.html',
            {
                'pupil_registration_form': pupil_form,
                'pupils': list_pupils,
                'list_pupils': list_pupils,
                'page_obj': page_obj
            }
        )
    else:
        return redirect('/')


def delete(request, id):
    pupil = Pupil.objects.get(id=id)
    pupil.delete()
    return redirect('/admin_panel/pupils_registration/')


def unpin(request, id):
    if request.method == "GET":
        logo_group = LogoGroups.objects.get(id=id)
        logo_group.delete()
        teacher_id = request.GET.get('id_teacher')
        print(teacher_id)
        logo_groups_filtered = LogoGroups.objects.filter(teacher=teacher_id)
        print(logo_groups_filtered)
        return render(
            request,
            'admin_panel/result_table.html',
            {
                'logo_groups_filtered': logo_groups_filtered
            }
        )


def groups(request):
    logo_group_form = LogoGroupsForm()
    return render(request, 'admin_panel/groups.html', {'logo_groups_form': logo_group_form})


def groups_view(request):
    if request.method == "POST":
        logo_group_form = LogoGroupsForm(request.POST)
        teacher_id = logo_group_form['teacher'].value()
        logo_groups_filtered = LogoGroups.objects.filter(teacher=teacher_id)
        print(logo_groups_filtered)
        return render(
            request,
            'admin_panel/result_table.html',
            {
                'logo_groups_form': LogoGroupsForm(request.POST),
                'logo_groups_filtered': logo_groups_filtered
            }
        )


def groups_attachment(request):
    if request.method == "POST":
        logo_group_form = LogoGroupsForm(request.POST)
        teacher_id = logo_group_form['teacher'].value()
        logo_groups_filtered = LogoGroups.objects.filter(teacher=teacher_id)
        if logo_group_form.is_valid():
            new_logo_group = logo_group_form.save(commit=False)
            new_logo_group.save()
            return render(
                request,
                'admin_panel/result_table.html',
                {
                    'logo_groups_filtered': logo_groups_filtered,
                }
            )