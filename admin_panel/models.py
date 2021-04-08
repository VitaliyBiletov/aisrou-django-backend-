from django.db import models
from datetime import datetime
from django.contrib.auth.models import User, Group
from .functions import get_name
from django.core.validators import RegexValidator


User.add_to_class("__str__", get_name)


class Pupil(models.Model):
    last_name = models.CharField(
        'Фамилия',
        max_length=50
    )
    first_name = models.CharField(
        'Имя',
        max_length=50
    )
    middle_name = models.CharField(
        'Отчество',
        null=True,
        max_length=50
    )
    date = models.DateField(
        'Дата регистрации',
        default=datetime.now
    )

    def __str__(self):
        return "{} {}".format(self.last_name, self.first_name)

    class Meta:
        verbose_name = 'Ученик'
        verbose_name_plural = 'Ученики'


# class Profile(models.Model):
#     validator = RegexValidator(
#             '^[А-Яа-я]+$',
#             message='Недопустимые символы',
#             code='invalid_lastName'
#         )
#
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#
#     last_name = models.CharField(
#         verbose_name='Фамилия',
#         max_length=30,
#         blank=False,
#         validators=[validator]
#     )
#     first_name = models.CharField(
#         verbose_name='Имя',
#         max_length=30,
#         blank=False,
#         validators=[validator]
#     )
#     patronymic = models.CharField(
#         verbose_name='Отчество',
#         max_length=30,
#         blank=False,
#         validators=[validator]
#     )
#     date = models.DateField(
#         'Дата регистрации',
#         default=datetime.now
#     )
#
#     def __str__(self):
#         return '{} {} {}'.format(self.last_name, self.first_name, self.patronymic)


# class LogoGroups(models.Model):
#     profile = models.ForeignKey(
#         'Profile',
#         verbose_name='Учитель',
#         on_delete=models.SET_NULL,
#         null=True,
#     )
#
#     pupil = models.ForeignKey(
#         Pupil,
#         verbose_name='Ученик',
#         on_delete=models.SET_NULL,
#         null=True
#     )
#
#     class Meta:
#         verbose_name = 'Логопедическая группа'
#         verbose_name_plural = 'Логопедические группы'