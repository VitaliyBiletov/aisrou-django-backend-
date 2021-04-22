from django.contrib import admin
from .models import CustomUser, ArticulatoryMotorSkills, Diagnostics


@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'last_name',)


@admin.register(ArticulatoryMotorSkills)
class ArticulatoryMotorSkillsAdmin(admin.ModelAdmin):
    list_display = ('id', 'repeat',)\



@admin.register(Diagnostics)
class DiagnosticsAdmin(admin.ModelAdmin):
    list_display = ('id', 'date_create',)

