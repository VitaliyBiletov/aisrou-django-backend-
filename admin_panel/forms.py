from django import forms
from django.contrib.auth import password_validation
from django.core.exceptions import ValidationError

from .models import CustomUser, Pupil, LogoGroups


class SDRegisterUserForm(forms.ModelForm):
    email = forms.EmailField(
        required=True,
        label="Электронная почта"
    )
    password1 = forms.CharField(
        label='Пароль',
        widget=forms.PasswordInput,
        help_text=password_validation.password_validators_help_text_html()
    )
    password2 = forms.CharField(
        label='Пароль(повторно)',
        widget=forms.PasswordInput,
        help_text='Введит пароль ещё раз'
    )

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


class ChangeUserInfoForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = ('username', 'last_name', 'first_name',
                  'patronymic', 'email', 'is_staff', 'password',)


class SetPasswordForm(forms.Form):
    password1 = forms.CharField(label='Пароль', required=True, widget=forms.PasswordInput)
    password2 = forms.CharField(label='Повторите пароль', required=True, widget=forms.PasswordInput)

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
        if commit:
            user.save()
        return user


class SDRegisterPupilForm(forms.ModelForm):

    class Meta:
        model = Pupil
        fields = ('first_name', 'last_name', 'middle_name')


class LogoGroupsForm(forms.ModelForm):
    class Meta:
        model = LogoGroups
        fields = ('custom_user', 'pupil')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['custom_user'].queryset = CustomUser.objects.filter(is_staff=False)