from django import forms
from django.contrib.auth import password_validation
from django.contrib.auth.forms import PasswordChangeForm
from django.core.exceptions import ValidationError

from main.models import CustomUser
from .models import Pupil


class SDRegisterUserForm(forms.ModelForm):
    email = forms.EmailField(required=True, label="Электронная почта")
    password1 = forms.CharField(label='Пароль',
                                widget=forms.PasswordInput,
                                help_text=password_validation.password_validators_help_text_html())
    password2 = forms.CharField(label='Пароль(повторно)',
                                widget=forms.PasswordInput,
                                help_text='Введит пароль ещё раз')

    def clean_password(self):
        password1 = self.cleaned_data['password1']
        if password1:
            password_validation.validate_password(password1)
        return password1

    def clean(self):
        super().clean()
        password1 = self.cleaned_data['password1']
        password2 = self.cleaned_data['password2']
        if password1 and password2 and password1 != password2:
            errors = {'password2': ValidationError(
                'Введенные пароли не совпадают', code='password_mismatch')}
            raise ValidationError(errors)

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data['password1'])
        user.is_active = True
        user.is_activated = True
        if commit:
            user.save()
        return user

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'password1', 'password2',
                 'last_name', 'first_name', 'patronymic')


class PasswordChangingForm(PasswordChangeForm):
    class Meta:
        model = CustomUser


class PupilRegistrationForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super(PupilRegistrationForm, self).__init__(*args, **kwargs)
        for field in iter(self.fields):
            self.fields[field].widget.attrs.update(
                {
                    'class': 'form-control col-md-5'
                }
            )

    class Meta:
        model = Pupil
        fields = ('first_name', 'last_name', 'middle_name')


# class LogoGroupsForm(forms.ModelForm):
#     class Meta:
#         model = LogoGroups
#         fields = ('profile', 'pupil')
#
#     def __init__(self, *args, **kwargs):
#         super().__init__(*args, **kwargs)
#         for field in iter(self.fields):
#             self.fields[field].widget.attrs.update(
#                 {
#                     'class': 'js-select2  form-control',
#                 }
#             )
        #self.fields['profile'].queryset = User.objects.filter(groups__name='Логопеды')