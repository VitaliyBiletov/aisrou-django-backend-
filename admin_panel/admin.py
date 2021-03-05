from django.contrib import admin
from .models import Pupil
# Register your models here.


class ClassPupil(admin.ModelAdmin):
    list_display = ('id', 'last_name', 'first_name')


admin.site.register(Pupil, ClassPupil)