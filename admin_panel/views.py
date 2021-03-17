from django.contrib.auth.decorators import login_required
from django.db import transaction
from django.shortcuts import render, redirect
from .forms import UserForm, PupilRegistrationForm, LogoGroupsForm, ProfileForm
from .models import Pupil, LogoGroups
from django.contrib.auth.models import User
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


# Create your views here.
def index(request):
    print(request.user)
    return render(
        request,
        'admin_panel/index.html',
        {
            'title': 'Администратор'
        }
    )


@login_required
@transaction.atomic
def users(request):
    if request.user.is_staff:
        if request.method == "POST":
            user_form = UserForm(request.POST)
            print(user_form)
            profile_form = ProfileForm(request.POST)
            if user_form.is_valid() and profile_form.is_valid():
                user = user_form.save()
                profile = profile_form.save(commit=False)
                profile.user = user
                profile.save()
                return redirect('/admin_panel/users_registration/')
        else:
            user_form = UserForm()
            profile_form = ProfileForm()
            list_users = User.objects.all()
            return render(
                request,
                'admin_panel/users_registration.html',
                {
                    'list_users': list_users,
                    'user_form': user_form,
                    'profile_form': profile_form,
                 }
        )
    else:
        return redirect('/')


def pupils(request):
    list_pupils = Pupil.objects.all()
    paginator = Paginator(list_pupils, 5)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    # try:
    #     pupils = paginator.page(page)
    # except PageNotAnInteger:
    #     pupils = paginator.page(1)
    # except EmptyPage:
    #     pupils = paginator.page(paginator.num_pages)

    if request.user.is_staff:
        if request.method == "POST":
            pupil_form = PupilRegistrationForm(request.POST)
            if pupil_form.is_valid():
                new_pupil = pupil_form.save()
                new_pupil.save()
                new_pupil_form = PupilRegistrationForm()
                return render(
                    request,
                    'admin_panel/pupils_registration.html',
                    {
                        'pupil_registration_form': new_pupil_form,
                        'list_pupils': page_obj,
                        # 'page_obj': page_obj,
                    }
                )
        else:
            pupil_form = PupilRegistrationForm()
        return render(
            request,
            'admin_panel/pupils_registration.html',
            {
                'pupil_registration_form': pupil_form,
                # 'pupils': list_pupils,
                'list_pupils': page_obj,
                # 'page_obj': page_obj,
            }
        )
    else:
        return redirect('/')


def delete_user(request, id):
    user = User.objects.get(id=id)
    user.delete()
    return redirect('/admin_panel/users_registration')


def delete(request, id):
    pupil = Pupil.objects.get(id=id)
    pupil.delete()
    return redirect('/admin_panel/pupils_registration')


def unpin(request, id):
    logo_group = LogoGroups.objects.get(id=id)
    logo_group.delete()
    profile_id = request.GET.get('profile_id')
    logo_groups_filtered = LogoGroups.objects.filter(profile=profile_id)
    return render(
        request,
        'admin_panel/result_table.html',
        {
            'logo_groups_filtered': logo_groups_filtered,
            'logo_groups_form': LogoGroupsForm(request.GET),
        }
    )


def groups(request):
    logo_group_form = LogoGroupsForm()
    return render(request, 'admin_panel/groups.html', {'logo_groups_form': logo_group_form})


def groups_view(request):
    if request.method == "POST":
        logo_group_form = LogoGroupsForm(request.POST)
        profile_id = logo_group_form['profile'].value()
        logo_groups_filtered = LogoGroups.objects.filter(profile=profile_id)
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
        profile_id = logo_group_form['profile'].value()
        logo_groups_filtered = LogoGroups.objects.filter(profile=profile_id)
        if logo_group_form.is_valid():
            logo_group_form.save()
            return render(
                request,
                'admin_panel/result_table.html',
                {
                    'logo_groups_filtered': logo_groups_filtered,
                }
            )