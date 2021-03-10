from django import forms
from django.contrib.auth.models import User
from .models import Pupil, LogoGroups


class UserRegistrationForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super(UserRegistrationForm, self).__init__(*args, **kwargs)
        for field in iter(self.fields):
            print(field)
            self.fields[field].widget.attrs.update(
                {
                    'class': 'form-control col-md-5'
                }
            )

    class Meta:
        model = User
        fields = (
            'username',
            'last_name',
            'first_name',
            'password',
            'is_staff',
            'groups'
        )


    # def clean_password2(self):
    #     cd = self.cleaned_data
    #     if cd['password'] != cd['password2']:
    #         raise forms.ValidationError('Passwords don\'t match.')
    #     return cd['password2']


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
        fields = ('teacher', 'pupil')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in iter(self.fields):
            self.fields[field].widget.attrs.update(
                {
                    'class': 'js-select2  form-control',
                }
            )
        self.fields['teacher'].queryset = User.objects.filter(groups__name='Логопеды')