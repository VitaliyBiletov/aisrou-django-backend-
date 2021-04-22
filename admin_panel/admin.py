from django.contrib import admin
from .models import Pupil, LogoGroups, CustomUser


@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = (
        'username',
        'last_name',
    )


@admin.register(Pupil)
class PupilAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'last_name',
        'first_name',
        'date'
    )


@admin.register(LogoGroups)
class LogoGroupsAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'custom_user',
        'pupil'
    )