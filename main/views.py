from django.contrib.auth import logout
from django.contrib.auth.views import LoginView, LogoutView
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.urls import reverse
from admin_panel.models import LogoGroups, Pupil
from main.models import Diagnostics, StatesOfFunctions, SensoMotorLevel
from .forms import StatesOfFunctionsForm
from datetime import datetime

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


@login_required
def create_diagnostic_view(request):
    print('Представление для создания диагностки')
    headers_tab_keys = TAB_HEADERS.items()
    if request.POST:
        print('POST create')
        request.session['pupil_id'] = request.POST['pupil_id']
        # request.session['date_of_creation'] = request.GET['date_of_creation']
        select_pupil = Pupil.objects.get(pk=request.session['pupil_id'])
        date_of_creation = request.POST['date_of_creation']
        date_of_creation = datetime.strptime(date_of_creation, "%Y-%m-%d")
        class_now = current_class(select_pupil.class_number, select_pupil.enrollment_date, date_of_creation)
        request.session['current_class'] = class_now
        diagnostic = Diagnostics.objects.create(
            user_id=request.user.id,
            pupil_id=select_pupil.id,
            date_of_creation=date_of_creation,
            current_class=class_now
        )
        StatesOfFunctions.objects.create(diagnostic_id=diagnostic.id)
        SensoMotorLevel.objects.create(diagnostic_id=diagnostic.id)
        request.session['diagnostic_id'] = diagnostic.id
        return HttpResponseRedirect(reverse('main:create_diagnostic'))
    else:
        select_pupil = Pupil.objects.get(pk=request.session['pupil_id'])
        print('GET create')
        diagnostic = Diagnostics.objects.get(id=request.session['diagnostic_id'])
        return render(
            request,
            'main/diagnostic.html',
            {
                'form': StatesOfFunctionsForm(),
                'headers_tab': headers_tab_keys,
                'diagnostic': diagnostic,
            }
        )


@login_required
def save_diagnostic_view(request):
    headers_tab_keys = TAB_HEADERS.items()
    # # Если метод POST то сохраняем
    if request.POST:
        data = request.POST.copy()
        diagnostic_id = request.session['diagnostic_id']
        data['diagnostic_id'] = diagnostic_id
        print(data)
        diagnostic = Diagnostics.objects.get(pk=diagnostic_id)
        current_state = StatesOfFunctions.objects.get(diagnostic_id=diagnostic)
        form = StatesOfFunctionsForm(data, instance=current_state)
        form.save()
        return HttpResponse('Данные успешно сохранены!')
    # Если метод GET то отображаем нужную диагностику
    else:
        diagnostic_id = request.GET['diagnostic_id']
        request.session['diagnostic_id'] = diagnostic_id
        diagnostic = Diagnostics.objects.get(pk=diagnostic_id)
        current_state = StatesOfFunctions.objects.get(diagnostic_id=diagnostic_id)
        form = StatesOfFunctionsForm(instance=current_state)
        return render(request,
                      'main/diagnostic.html',
                      {
                          'form': form,
                          'headers_tab': headers_tab_keys,
                          'select_pupil': Pupil.objects.get(id=diagnostic.pupil_id.id),
                          'diagnostic': diagnostic,
                      })


def delete_diagnostic_view(request):
    print(request.GET)
    if request.GET:
        diagnostic_id = request.GET['diagnostic_id']
        Diagnostics.objects.filter(id=diagnostic_id).delete()
        diagnostics = Diagnostics.objects.filter(pupil_id=request.GET['pupil_id'])
        diags = {}
        for diag in diagnostics:
            diags[diag.id] = diag.date_of_creation.strftime('%d/%m/%Y')

        print(diagnostic_id)
        return JsonResponse({
            "status": "ok",
            'diagnostic_dates': diags,
        })
    return JsonResponse({"status": "err"})


# Функция получает текущий номер класса исходя из класса зачисления,
# высчитывается за счет кол-ва августов
def current_class(enrollment_сlass, date_came, date_diag):
    count = 0
    if date_came.month <= 8:
        count = count + 1

    if date_diag.month > 8:
        count = count + 1

    count = count + (date_diag.year - date_came.year) - 1
    class_num = enrollment_сlass + count
    return class_num


def list_diagnostics(request):
    diagnostics = Diagnostics.objects.filter(pupil_id=request.GET['pupil_id']).order_by('-date_of_creation')
    diags = {}
    count = 0
    for diag in diagnostics:
        diags[count] = {'id': diag.id, 'date': diag.date_of_creation.strftime('%d/%m/%Y')}
        count = count + 1
    print(diags)
    return JsonResponse(diags)
