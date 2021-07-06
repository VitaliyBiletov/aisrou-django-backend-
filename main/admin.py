from django.contrib import admin
from .models import Diagnostics, StatesOfFunctions, SensoMotorLevel


@admin.register(Diagnostics)
class DiagnosticsAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_id', 'pupil_id', 'date_of_creation',)


@admin.register(StatesOfFunctions)
class StatesOfFunctionsAdmin(admin.ModelAdmin):
    list_display = ('id',
                    'hearing',
                    'vision', 'breath',
                    'voice',
                    'prosody',
                    'articulation_apparatus',
                    'motor_skills',
                    'additional_information',
    )


@admin.register(SensoMotorLevel)
class SensoMotorLevelAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'phonemic_perception',
        'sound_pronunciation',
        'sound_syllable_structure',
    )