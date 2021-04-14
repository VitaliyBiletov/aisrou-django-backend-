from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.messages.views import SuccessMessageMixin
from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse_lazy
from django.views.generic import UpdateView, CreateView
from .forms import SDRegisterPupilForm, SDRegisterUserForm, ChangeUserInfoForm, SetPasswordForm, LogoGroupsForm
from .models import Pupil, LogoGroups
from main.models import CustomUser
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib import messages


@login_required
def index(request):
    print(request)
    return render(
        request,
        'admin_panel/index.html'
    )


@login_required
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


class SDRegisterUserView(SuccessMessageMixin, CreateView):
    model = CustomUser
    template_name = 'admin_panel/register_user.html'
    form_class = SDRegisterUserForm
    success_url = reverse_lazy('admin_panel:users')
    success_message = 'Пользователь успешно добавлен'


def set_password(request, id):
    form = SetPasswordForm()
    user = CustomUser.objects.get(pk=id)
    if request.POST:
        form = SetPasswordForm(request.POST)
        if form.is_valid():
            password = form.cleaned_data['password1']
            user.set_password(password)
            user.save()
            messages.success(request, 'Пароль успешно изменен')
            return redirect('admin_panel:users')
    return render(request, 'admin_panel/password_change.html', {'form': form, 'user': user})


def user_delete(request, id):
    user = CustomUser.objects.get(id=id)
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
            pupil_form = SDRegisterPupilForm(request.POST)
            if pupil_form.is_valid():
                pupil_form.save()
                return redirect('/admin_panel/pupils_registration/')
        else:
            return render(
                request,
                'admin_panel/pupils.html',
                {
                    'pupil_registration_form': SDRegisterPupilForm(),
                    'list_pupils': pupils,
                }
            )
    else:
        return redirect('/')


class SDPupilRegisterView(SuccessMessageMixin, CreateView):
    model = Pupil
    template_name = 'admin_panel/register_pupil.html'
    form_class = SDRegisterPupilForm
    success_url = reverse_lazy('admin_panel:pupils')
    success_message = 'Ученик успешно добавлен'


class SDChangePupilInfoView(SuccessMessageMixin, LoginRequiredMixin, UpdateView):
    model = Pupil
    template_name = 'admin_panel/change_pupil_info.html'
    form_class = SDRegisterPupilForm
    success_url = reverse_lazy('admin_panel:pupils')
    success_message = 'Данные сохранены'

    def get_object(self, queryset=None):
        if not queryset:
            queryset = self.get_queryset()
        return get_object_or_404(queryset, pk=self.kwargs['id'])


def pupil_delete(request, id):
    pupil = Pupil.objects.get(id=id)
    pupil.delete()
    return redirect('/admin_panel/pupils')


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


def groups(request):
    logo_group_form = LogoGroupsForm()
    logo_groups = LogoGroups.objects.all()
    return render(request, 'admin_panel/groups.html', {
        'form': logo_group_form,
        'logo_groups': logo_groups
    })


def groups_view(request):
    if request.method == "POST":
        logo_group_form = LogoGroupsForm(request.POST)
        user_id = logo_group_form['custom_user'].value()
        if user_id:
            logo_groups_filtered = LogoGroups.objects.filter(custom_user=user_id)
        else:
            logo_groups_filtered = None
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
        profile_id = logo_group_form['custom_user'].value()
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