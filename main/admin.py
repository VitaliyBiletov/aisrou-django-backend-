from django.contrib import admin
from .models import Diagnostics


@admin.register(Diagnostics)
class DiagnosticsAdmin(admin.ModelAdmin):
    list_display = ('id', 'date_create',)

