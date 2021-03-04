from django.contrib import admin
from .models import Pupil, Class


class ClassAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'number_class')


admin.site.register(Class, ClassAdmin)


class ClassPupil(admin.ModelAdmin):
    list_display = ('id', 'last_name', 'first_name', 'class_number')


admin.site.register(Pupil, ClassPupil)

