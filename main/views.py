from django.contrib.auth import logout
from django.contrib.auth.views import LoginView, LogoutView
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.urls import reverse
from admin_panel.models import LogoGroups, Pupil
from main.models import Diagnostics
from .forms import StatesOfFunctionsForm

TAB_HEADERS = {
    'state_functions': 'Состояние функций',
    'senso_motor_level': 'Сенсо-моторный уровень',
    'grammatical_structure_of_speech': 'Грамматический строй речи',
    'vocabulary': 'Словарный запас',
    'coherent_speech': 'Связная речь',
    'language_analysis': 'Языковой анализ',
    'word_formation': 'Словообразование',
    'reading': 'Чтение',
    'writing': 'Письмо',
}


@login_required
def index(request):
    if request.user.is_staff:
        return render(request, 'admin_panel/index.html')
    logo_group_for_user = LogoGroups.objects.filter(custom_user=request.user.id)
    return render(request, 'main/index.html', {
        'logo_group_for_user': logo_group_for_user,
    })


class SDLoginView(LoginView):
    template_name = 'main/login.html'


def logout_view(request):
    logout(request)
    return redirect('/')


class SDLogoutView(LogoutView):
    template_name = "main/logout.html"


def diagnostic_view(request):
    # form = StatesOfFunctionsForm()
    # print(request.GET['pupil_id'])
    # request.session['pupil_id'] = request.GET['pupil_id']
    # select_pupil = Pupil.objects.get(pk=request.session['pupil_id'])
    if request.GET:
        request.session['pupil_id'] = request.GET['pupil_id']
        select_pupil = Pupil.objects.get(pk=request.session['pupil_id'])
        diag = Diagnostics.objects.create(user_id=request.user, pupil_id=select_pupil)
        request.session['diagnostic_id'] = diag.id
        print('diag_id = ', diag.id)
        return redirect(reverse('main:add_diagnostic'))
    return redirect('/')


def add_diagnostic_view(request):
    headers_tab_keys = TAB_HEADERS.items()
    print(headers_tab_keys)
    if request.POST:
        data = request.POST.copy()
        data['diagnostic_id'] = str(request.session['diagnostic_id'])
        print(data)
        form = StatesOfFunctionsForm(data)
        if form.is_valid():
            form.save()
            select_pupil = Pupil.objects.get(pk=request.session['pupil_id'])
            return redirect(reverse('main:add_diagnostic'))
        else:
            print(form.errors)
    form = StatesOfFunctionsForm()
    select_pupil = Pupil.objects.get(pk=request.session['pupil_id'])
    return render(request, 'main/diagnostics.html',
                  {
                      'select_pupil': select_pupil,
                      'form': form,
                      'headers_tab': headers_tab_keys
                  })


def save_diagnostic_view(request):
    data = request.POST.copy()
    print('session: ', request.session['diag_id'])
    data['diagnostic_id'] = str(request.session['diag_id'])
    print(data)
    form = StatesOfFunctionsForm(data)
    if form.is_valid():
        form.save()
        select_pupil = Pupil.objects.get(pk=request.session['pupil_id'])
        return render(request, 'main/diagnostics.html',
                      {
                          'form': StatesOfFunctionsForm(),
                          'select_pupil': select_pupil,
                      })
    return HttpResponse('Не работает!')