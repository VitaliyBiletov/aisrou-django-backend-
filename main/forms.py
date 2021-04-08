from django import forms
from .models import CustomUser


class ChangeUserInfoForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = ('username', 'last_name', 'first_name', 'patronymic', 'email', 'is_staff')
