from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.views import PasswordChangeView
from django.contrib.messages.views import SuccessMessageMixin
from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse_lazy
from django.views.generic import UpdateView, CreateView
from django.views.generic.detail import SingleObjectMixin

from main.forms import ChangeUserInfoForm
from .forms import PupilRegistrationForm, SDRegisterUserForm, PasswordChangingForm
from .models import Pupil
from main.models import CustomUser
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


@login_required
def index(request):
    return render(
        request,
        'admin_panel/index.html'
    )


def users(request):
    list_users = CustomUser.objects.all()
    return render(
        request,
        'admin_panel/users.html',
        {
            'list_users': list_users,
         }
    )


class SDChangeUserInfoView(SuccessMessageMixin, LoginRequiredMixin, UpdateView):
    model = CustomUser
    template_name = 'admin_panel/change_user_info.html'
    form_class = ChangeUserInfoForm
    success_url = reverse_lazy('admin_panel:users')
    success_message = 'Данные сохранены'

    def get_object(self, queryset=None):
        if not queryset:
            queryset = self.get_queryset()
        return get_object_or_404(queryset, pk=self.kwargs['id'])


class SDPasswordChangeView(SuccessMessageMixin, LoginRequiredMixin, PasswordChangeView):
    template_name = 'admin_panel/password_change.html'
    form_class = PasswordChangingForm
    success_url = reverse_lazy('admin_panel:users')
    success_message = 'Пароль успешно изменен'


class SDRegisterUserView(SuccessMessageMixin, CreateView):
    model = CustomUser
    template_name = 'admin_panel/register_user.html'
    form_class = SDRegisterUserForm
    success_url = reverse_lazy('admin_panel:users')
    success_message = 'Регистрация успешно выполнена'


# def delete_user(request, id):
#     user = User.objects.get(id=id)
#     user.delete()
#     return redirect('/admin_panel/users')


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