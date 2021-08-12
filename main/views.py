from django.contrib.auth import logout
from django.contrib.auth.views import LoginView, LogoutView
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
import json
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
    return render(request, 'dist/index.html', {
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
@csrf_exempt
def diagnostic_view(request):
    diag = Diagnostics.objects.get(id=request.session['diagnostic_id'])
    pupil = Pupil.objects.get(id=diag.pupil_id)
    pupil_class = current_class(pupil.class_number, pupil.date, diag.date_of_creation)
    return render(request, 'dist/diagnostic.html', {
        'diag': diag,
        'pupil_class': pupil_class})


@login_required
@csrf_exempt
def create_diagnostic_view(request):
    if request.method == 'POST':
        req = json.loads(request.body)
        selected_pupil_id = req['selected_pupil_id']['id']
        select_pupil = Pupil.objects.get(pk=selected_pupil_id)
        date_of_creation = req['date']['value']
        date_of_creation = datetime.strptime(date_of_creation, "%Y-%m-%d")
        class_now = current_class(select_pupil.class_number, select_pupil.enrollment_date, date_of_creation)
        # request.session['current_class'] = class_now
        diagnostic = Diagnostics.objects.create(
            user_id=request.user.id,
            pupil_id=select_pupil.id,
            date_of_creation=date_of_creation,
            current_class=class_now
        )
        StatesOfFunctions.objects.create(diagnostic_id=diagnostic.id)
        SensoMotorLevel.objects.create(diagnostic_id=diagnostic.id, phonemic_perception='-------------')
        request.session['diagnostic_id'] = diagnostic.id
        return JsonResponse({'status':'ok'})
    return HttpResponse('req')

    # if request.POST:
    #     print('POST create')
    #     request.session['pupil_id'] = request.POST['pupil_id']
    #     # request.session['date_of_creation'] = request.GET['date_of_creation']
    #     select_pupil = Pupil.objects.get(pk=request.session['pupil_id'])
    #     date_of_creation = request.POST['date_of_creation']
    #     date_of_creation = datetime.strptime(date_of_creation, "%Y-%m-%d")
    #     class_now = current_class(select_pupil.class_number, select_pupil.enrollment_date, date_of_creation)
    #     request.session['current_class'] = class_now
    #     diagnostic = Diagnostics.objects.create(
    #         user_id=request.user.id,
    #         pupil_id=select_pupil.id,
    #         date_of_creation=date_of_creation,
    #         current_class=class_now
    #     )
    #     StatesOfFunctions.objects.create(diagnostic_id=diagnostic.id)
    #     SensoMotorLevel.objects.create(diagnostic_id=diagnostic.id, phonemic_perception='-------------')
    #     request.session['diagnostic_id'] = diagnostic.id
    #     return HttpResponseRedirect(reverse('main:create_diagnostic'))
    # else:
    #     select_pupil = Pupil.objects.get(pk=request.session['pupil_id'])
    #     print('GET create')
    #     diagnostic = Diagnostics.objects.get(id=request.session['diagnostic_id'])
    #     scores = SensoMotorLevel.objects.get(diagnostic_id=diagnostic.id)
    #     print(scores)
    #     return render(
    #         request,
    #         'main/diagnostic.html',
    #         {
    #             'form': StatesOfFunctionsForm(),
    #             'headers_tab': headers_tab_keys,
    #             'diagnostic': diagnostic,
    #             'scores': scores.phonemic_perception,
    #         }
    #     )


@csrf_exempt
def list_pupils_view(request):
    user_id = request.user.id
    pupils = []
    for logo_group in LogoGroups.objects.filter(custom_user_id=user_id):
        pupils.append({
            'id': str(logo_group.pupil_id),
            'pupil': Pupil.objects.get(id=logo_group.pupil_id).__str__(),
        })
    return JsonResponse({'pupils': pupils})


@csrf_exempt
def list_diags_view(request):
    pupil_id = json.loads(request.body)['selected_pupil_id']
    list_diags_query = Diagnostics.objects.filter(pupil_id=pupil_id)
    list_diags = []
    for diag in list_diags_query:
        list_diags.append({'id': diag.id, 'date': diag.date_of_creation})
    return JsonResponse({'list_diags': list_diags})


@login_required
@csrf_exempt
def edit_diagnostic_view(request):
    if request.GET:
        print('Изменение GET')
        print(request.GET)
    return JsonResponse({'status': 'ok'})


@login_required
@csrf_exempt
def save_diagnostic_view(request):
    response = json.loads(request.body)['data']
    d_id = request.session['diagnostic_id']
    stateOfFunctions = StatesOfFunctions.objects.get(diagnostic_id = d_id)

    for name in response['stateOfFunctions']:
        stateOfFunctions.__setattr__(name, response['stateOfFunctions'][name])
    stateOfFunctions.save()

    print(stateOfFunctions.__dict__)
    sensoMotorLevel = SensoMotorLevel.objects.get(diagnostic_id = d_id)
    phonemic_perception = response["sensoMotorLevel"]["phonemicPerception"]
    sensoMotorLevel.phonemic_perception = json.dumps(phonemic_perception)
    sensoMotorLevel.save()
    return HttpResponse('Данные успешно сохранены!')
        # for state in response['stateOfFunctions']:
        #     print(response['stateOfFunctions'][state])


    # # Если метод POST то сохраняем
    # if request.POST:
    #     print('Сохранение POST')
    #     # print(request.POST)
    #     data = request.POST.copy()
    #     diagnostic_id = request.session['diagnostic_id']
    #     data['diagnostic'] = diagnostic_id
    #     phonemic_perception = data['phonemicPerception']
    #     data.pop('phonemicPerception')
    #     print(data)
    #     print('phonemic_perception = ', str(phonemic_perception))
    #     print('data = ', data)
    #     diagnostic = Diagnostics.objects.get(pk=diagnostic_id)
    #     current_section_sof = StatesOfFunctions.objects.get(diagnostic=diagnostic)
    #     current_section_sml = SensoMotorLevel.objects.get(diagnostic=diagnostic)
    #     current_section_sml.phonemic_perception = phonemic_perception
    #     current_section_sml.save()
    #     form = StatesOfFunctionsForm(data, instance=current_section_sof)
    #     if form.is_valid:
    #         form.save()
    #         print("Состояние функций успешно сохранено")
    #     else:
    #         print(form.errors)
    #
    #     return HttpResponse('Данные успешно сохранены!')
    # # Если метод GET то отображаем нужную диагностику
    # else:
    if request.GET:
        print('Изменение GET')
        print(request.GET)
        diagnostic_id = request.GET['diagnostic_id']
        print(diagnostic_id)
        request.session['diagnostic_id'] = diagnostic_id
        diagnostic = Diagnostics.objects.get(pk=diagnostic_id)
        current_section_sof = StatesOfFunctions.objects.get(diagnostic_id=diagnostic_id)
        scores = SensoMotorLevel.objects.get(diagnostic_id=diagnostic_id)
        form = StatesOfFunctionsForm(instance=current_section_sof)
        return render(request,
                      'main/diagnostic.html',
                      {
                          'form': form,
                          'select_pupil': Pupil.objects.get(id=diagnostic.pupil_id),
                          'diagnostic': diagnostic,
                          'scores': scores.phonemic_perception,
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
