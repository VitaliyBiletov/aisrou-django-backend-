from django import forms
from django.contrib.auth.models import User
from .models import Pupil, LogoGroups, Profile


class UserForm(forms.ModelForm):
    password = forms.CharField(label='Пароль', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Повторите пароль', widget=forms.PasswordInput)

    def __init__(self, *args, **kwargs):
        super(UserForm, self).__init__(*args, **kwargs)
        for field in iter(self.fields):
            self.fields[field].widget.attrs.update(
                {
                    'class': 'form-control'
                }
            )

    class Meta:
        model = User
        fields = (
            'username',
            'password',
            'password2',
            'groups',
        )

    def clean_password2(self):
        cd = self.cleaned_data
        if cd['password'] != cd['password2']:
            raise forms.ValidationError('Пароли не совпадают')
        return cd['password2']


class ProfileForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super(ProfileForm, self).__init__(*args, **kwargs)
        for field in iter(self.fields):
            self.fields[field].widget.attrs.update(
                {
                    'class': 'form-control'
                }
            )

    class Meta:
        model = Profile
        fields = (
            'last_name',
            'first_name',
            'patronymic',
        )
        widgets = {
            'first_name': forms.TextInput(attrs={'required': 'True'}),
            'last_name': forms.TextInput(attrs={'required': 'True'}),
            'patronymic': forms.TextInput(attrs={'class': 'form-control', 'required': 'True'})
        }


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


class LogoGroupsForm(forms.ModelForm):
    class Meta:
        model = LogoGroups
        fields = ('profile', 'pupil')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in iter(self.fields):
            self.fields[field].widget.attrs.update(
                {
                    'class': 'js-select2  form-control',
                }
            )
        #self.fields['profile'].queryset = User.objects.filter(groups__name='Логопеды')