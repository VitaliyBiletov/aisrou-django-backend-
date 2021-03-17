from django.db import models
from datetime import datetime
from django.contrib.auth.models import User, Group
from .functions import get_name
from django.db.models.signals import post_save
from django.dispatch import receiver


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
        return get_name(self)

    class Meta:
        verbose_name = 'Ученик'
        verbose_name_plural = 'Ученики'


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.PROTECT)

    last_name = models.CharField(
        verbose_name='Фамилия',
        max_length=30,
        blank=True
    )
    first_name = models.CharField(
        verbose_name='Имя',
        max_length=30,
        blank=True
    )
    patronymic = models.CharField(
        verbose_name='Отчество',
        max_length=30,
        blank=True
    )

    def __str__(self):
        return '{} {} {}'.format(self.last_name, self.first_name, self.patronymic)


class LogoGroups(models.Model):

    teacher = models.ForeignKey(
        User,
        verbose_name='Учитель',
        on_delete=models.SET_NULL,
        null=True,
        limit_choices_to={'groups__name': "Логопеды"}
    )

    pupil = models.ForeignKey(
        Pupil,
        verbose_name='Ученик',
        on_delete=models.SET_NULL,
        null=True
    )

    class Meta:
        verbose_name = 'Логопедическая группа'
        verbose_name_plural = 'Логопедические группы'