from django import forms
from .models import StatesOfFunctions


# class StatesOfFunctionsForm(forms.ModelForm):
#     def __init__(self, *args, **kwargs):
#         super(StatesOfFunctionsForm, self).__init__(*args, **kwargs)
#         for field in self.fields:
#             self.fields[field].widget.attrs['rows'] = 2
#             self.fields[field].widget.attrs['placeholder'] = ''
#             self.fields[field].widget.attrs['class'] = 'form-control'
#             # field.widget.attrs['rows'] = 1
#
#     class Meta:
#         model = StatesOfFunctions
#         fields = ('diagnostic',
#                   'hearing',
#                   'vision',
#                   'breath',
#                   'voice',
#                   'prosody',
#                   'articulation_apparatus',
#                   'motor_skills',
#                   )
#         widgets = {
#             'diagnostic': forms.HiddenInput(),
#         }
