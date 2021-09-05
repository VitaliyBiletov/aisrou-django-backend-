from django.contrib.auth import logout
from django.contrib.auth.views import LoginView, LogoutView
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
import json
from admin_panel.models import LogoGroups, Pupil
from main.models import Diagnostics, StatesOfFunctions, SensoMotorLevel
from .forms import StatesOfFunctionsForm
from datetime import datetime
import os

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


@csrf_exempt
def load_data(request):
    diagnostic = json.loads(request.body)['diagnostic']
    diagnostic_id = request.session['diagnostic_id']
    # print(diagnostic)
    state_of_functions = StatesOfFunctions.objects.get(diagnostic_id=diagnostic_id)
    state_of_functions_dict = state_of_functions.__dict__
    for item in diagnostic['stateOfFunctions']:
        diagnostic['stateOfFunctions'].update({item: state_of_functions_dict[item]})

    senso_motor_level = SensoMotorLevel.objects.get(diagnostic_id=diagnostic_id)
    senso_motor_level_dict = []
    if (senso_motor_level.phonemic_perception):
        for item in senso_motor_level.phonemic_perception.split('&'):
            id, value = item.split(':')
            if (value is not None) and (not value == 'None'):
                value = int(value)
            else:
                value = None
            senso_motor_level_dict.append({'id': int(id), 'value': value})

    diagnostic['sensoMotorLevel']['phonemicPerception']['values'] = senso_motor_level_dict
    return JsonResponse({'diagnostic': diagnostic})

@csrf_exempt
def load_pictures(request, id):
    path_to_dir = os.path.dirname(os.path.dirname(__file__))
    path_to_pics = os.path.join(path_to_dir,'static','src','main','img','syllables',id,)
    listOfPictures = os.listdir(path=path_to_pics)
    return JsonResponse({'listOfPictures': sorted(listOfPictures)})


@login_required
@csrf_exempt
def open_diagnostic_view(request, type):
    if request.method == 'POST':
        request.session['type'] = type
        req = json.loads(request.body)
        if type == 'create':
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
            templateStr = "0:None&1:None&2:None&3:None&4:None&5:None&6:None&7:None&8:None&9:None&10:None&11:None&12:None"
            StatesOfFunctions.objects.create(diagnostic_id=diagnostic.id)
            SensoMotorLevel.objects.create(diagnostic_id=diagnostic.id, phonemic_perception=templateStr)
            request.session['diagnostic_id'] = diagnostic.id
            return JsonResponse({'status': 'ok'})
        if type == 'edit':
            id = json.loads(request.body)['id']
            request.session['diagnostic_id'] = id
            return JsonResponse({})
    return HttpResponse('req')


@csrf_exempt
def list_pupils_view(request):
    user_id = request.user.id
    pupils = []
    for logo_group in LogoGroups.objects.filter(custom_user_id=user_id):
        pupils.append({
            'id': str(logo_group.pupil_id),
            'name': Pupil.objects.get(id=logo_group.pupil_id).__str__(),
        })
    return JsonResponse({'pupils': pupils, 'csrf': request.COOKIES['csrftoken']})


@csrf_exempt
def list_diags_view(request):
    pupil_id = json.loads(request.body)['selected_pupil_id']
    list_diags_query = Diagnostics.objects.filter(pupil_id=pupil_id)
    list_diags = []
    for diag in list_diags_query:
        list_diags.append({'id': diag.id, 'date': diag.date_of_creation})
    return JsonResponse({'list_of_diagnostics': list_diags})


@login_required
@csrf_exempt
def edit_diagnostic_view(request):
    if request.method == 'POST':
        id = json.loads(request.body)['id']
        request.session['diagnostic_id'] = id
    return JsonResponse({'status': 'ok'})


@login_required
@csrf_exempt
def save_diagnostic_view(request):
    response = json.loads(request.body)['data']['diagnostic']
    d_id = request.session['diagnostic_id']

    stateOfFunctions = StatesOfFunctions.objects.get(diagnostic_id=d_id)
    for name in response['stateOfFunctions']:
        stateOfFunctions.__setattr__(name, response['stateOfFunctions'][name])
    stateOfFunctions.save()

    sensoMotorLevel = SensoMotorLevel.objects.get(diagnostic_id=d_id)
    phonemic_perception = response["sensoMotorLevel"]["phonemicPerception"]["values"]

    phonemic_perception_date = []
    for item in phonemic_perception:
        phonemic_perception_date.append("{}:{}".format(item['id'], item['value']))
    phonemic_perception_str = '&'.join(phonemic_perception_date)
    sensoMotorLevel.phonemic_perception = phonemic_perception_str
    sensoMotorLevel.save()

    return HttpResponse('Данные успешно сохранены!')


def delete_diagnostic_view(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        diagnostic_id = response['diagnostic_id']
        pupil_id = response['pupil_id']
        Diagnostics.objects.filter(id=diagnostic_id).delete()
        list_diags_query = Diagnostics.objects.filter(pupil_id=pupil_id)
        list_diags = []
        for diag in list_diags_query:
            list_diags.append({'id': diag.id, 'date': diag.date_of_creation})
        return JsonResponse({
            "csrf": request.COOKIES['csrftoken'],
            "diagnostics_list": list_diags,
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
    return JsonResponse(diags)
