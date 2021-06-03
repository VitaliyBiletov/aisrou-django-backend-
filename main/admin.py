from django.contrib import admin
from .models import Diagnostics, StatesOfFunctions


@admin.register(Diagnostics)
class DiagnosticsAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_id', 'pupil_id', 'date_of_creation',)


@admin.register(StatesOfFunctions)
class StatesOfFunctionsAdmin(admin.ModelAdmin):
    list_display = ('id',)