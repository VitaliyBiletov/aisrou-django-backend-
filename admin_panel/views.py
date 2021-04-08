from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import LoginView
from django.shortcuts import render, redirect
from .forms import UserForm, PupilRegistrationForm\
    # , LogoGroupsForm, ProfileForm
from .models import Pupil\
    # , LogoGroups, Profile
from django.contrib.auth.models import User
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.http import HttpResponse, JsonResponse


# Create your views here.
def index(request):
    return render(
        request,
        'admin_panel/index.html',
        {
            'title': 'Администратор'
        }
    )


@login_required
def users(request):
    list_users = User.objects.all()
    return render(
        request,
        'admin_panel/users.html',
        {
            'list_users': list_users,
         }
    )
    # else:
    #     return redirect('/')


# def edit_user(request, tmplt_name='admin_panel/users.html', id=None):
#     if id:
#         user = User.objects.get(id=id)
#         profile = Profile.objects.get(user_id=id)
#     else:
#         user = User()
#         profile = Profile()
#
#     user_form = UserForm(request.POST or None, instance=user)
#     profile_form = ProfileForm(request.POST or None, instance=profile)
#
#
#     if request.POST:
#         print(request.POST)
#         if user_form.is_valid() and profile_form.is_valid():
#             user = user_form.save(commit=False)
#             user.set_password(user_form.cleaned_data['password'])
#             user.save()
#             profile = profile_form.save(commit=False)
#             profile.user = user
#             profile.save()
#             return JsonResponse({
#                 'user_form_errors': '',
#                 'profile_form_errors': ''
#             })
#         else:
#             print(profile_form.errors)
#             # print(user_form.errors)
#             return JsonResponse({
#                 'user_form_errors': user_form.errors,
#                 'profile_form_errors': profile_form.errors,
#             })
#
#     return render(
#         request,
#         tmplt_name,
#         {
#             'user_form': user_form,
#             'profile_form': profile_form,
#             'id': id,
#         }
#     )

    # if id:
    #     user = User.objects.get(id=id)
    #     user_form = UserForm(instance=user)
    #     profile = Profile.objects.get(user_id=id)
    #     profile_form = ProfileForm(instance=profile)
    #     if request.method == "POST":
    #         # user = User.objects.get(pk=id)
    #         # profile = Profile.objects.get(user_id=id)
    #         user_form = UserForm(request.POST, instance=user)
    #         profile_form = ProfileForm(request.POST, instance=profile)
    #         if user_form.is_valid() and profile_form.is_valid():
    #             user_form.save()
    #             profile_form.save()
    #             return redirect('/admin_panel/users/')
    #     return render(
    #         request,
    #         'admin_panel/user_form_edit.html',
    #         {
    #             'user_form': user_form,
    #             'profile_form': profile_form,
    #             'id': id
    #         }
    #     )
    # else:
    #     if request.method == "POST":
    #         user_form = UserForm(request.POST)
    #         profile_form = ProfileForm(request.POST)
    #         if user_form.is_valid() and profile_form.is_valid():
    #             user = user_form.save(commit=False)
    #             user.set_password(user_form.cleaned_data['password'])
    #             user.save()
    #             profile = profile_form.save(commit=False)
    #             profile.user = user
    #             profile.save()
    #             return redirect('/admin_panel/users/')
    #     else:
    #         user_form = UserForm()
    #         profile_form = ProfileForm()
    #         return render(
    #             request,
    #             'admin_panel/user_form_add.html',
    #             {
    #                 'user_form': user_form,
    #                 'profile_form': profile_form,
    #             }
    #         )


def delete_user(request, id):
    user = User.objects.get(id=id)
    user.delete()
    return redirect('/admin_panel/users')


def pupils(request):
    list_pupils = Pupil.objects.all()
    page = request.GET.get('page', 1)

    paginator = Paginator(list_pupils, 5)
    try:
        pupils = paginator.page(page)
    except PageNotAnInteger:
        pupils = paginator.page(1)
    except EmptyPage:
        pupils = paginator.page(paginator.num_pages)

    if request.user.is_staff:
        if request.method == "POST":
            pupil_form = PupilRegistrationForm(request.POST)
            if pupil_form.is_valid():
                pupil_form.save()
                return redirect('/admin_panel/pupils_registration/')
        else:
            return render(
                request,
                'admin_panel/pupils_registration.html',
                {
                    'pupil_registration_form': PupilRegistrationForm(),
                    'list_pupils': pupils,
                }
            )
    else:
        return redirect('/')


def delete(request, id):
    pupil = Pupil.objects.get(id=id)
    pupil.delete()
    return redirect('/admin_panel/pupils_registration')


# def unpin(request, id):
#     logo_group = LogoGroups.objects.get(id=id)
#     logo_group.delete()
#     profile_id = request.GET.get('profile_id')
#     logo_groups_filtered = LogoGroups.objects.filter(profile=profile_id)
#     return render(
#         request,
#         'admin_panel/result_table.html',
#         {
#             'logo_groups_filtered': logo_groups_filtered,
#             'logo_groups_form': LogoGroupsForm(request.GET),
#         }
#     )


# def groups(request):
#     logo_group_form = LogoGroupsForm()
#     return render(request, 'admin_panel/groups.html', {'logo_groups_form': logo_group_form})


# def groups_view(request):
#     if request.method == "POST":
#         logo_group_form = LogoGroupsForm(request.POST)
#         profile_id = logo_group_form['profile'].value()
#         logo_groups_filtered = LogoGroups.objects.filter(profile=profile_id)
#         return render(
#             request,
#             'admin_panel/result_table.html',
#             {
#                 'logo_groups_form': LogoGroupsForm(request.POST),
#                 'logo_groups_filtered': logo_groups_filtered
#             }
#         )


# def groups_attachment(request):
#     if request.method == "POST":
#         logo_group_form = LogoGroupsForm(request.POST)
#         profile_id = logo_group_form['profile'].value()
#         logo_groups_filtered = LogoGroups.objects.filter(profile=profile_id)
#         if logo_group_form.is_valid():
#             logo_group_form.save()
#             return render(
#                 request,
#                 'admin_panel/result_table.html',
#                 {
#                     'logo_groups_filtered': logo_groups_filtered,
#                 }
#             )