from django.contrib import admin
from .models import ArticulatoryMotorSkills, Diagnostics


@admin.register(ArticulatoryMotorSkills)
class ArticulatoryMotorSkillsAdmin(admin.ModelAdmin):
    list_display = ('id', 'repeat',)\



@admin.register(Diagnostics)
class DiagnosticsAdmin(admin.ModelAdmin):
    list_display = ('id', 'date_create',)

