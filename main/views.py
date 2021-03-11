from django.shortcuts import render
from django.contrib.auth.decorators import login_required


@login_required
def index(request):
    if request.user.is_staff:
        return render(request, 'admin_panel/index.html')

    return render(request, 'main/index.html')


def login(request):
    return render(request, 'registration/login.html')
