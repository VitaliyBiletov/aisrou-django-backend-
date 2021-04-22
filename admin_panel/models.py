from django.db import models
from datetime import datetime
from django.contrib.auth.models import User, Group
from django.dispatch import receiver

from main.models import CustomUser
from django.db.models import signals
from .functions import get_name
from django.core.validators import RegexValidator


# User.add_to_class("__str__", get_name)


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
        ordering = ['last_name']


@receiver(signals.post_save, sender=Pupil)
def print_message(sender, instance, created, **kwargs):
    print('sender: ', sender)
    print('instance: ', instance)
    print('created: ', created)
    print('Message')

class LogoGroups(models.Model):
    custom_user = models.ForeignKey(
        CustomUser,
        verbose_name='Учитель',
        on_delete=models.PROTECT,
        null=True,
    )

    pupil = models.ForeignKey(
        Pupil,
        verbose_name='Ученик',
        on_delete=models.PROTECT,
        null=True
    )

    class Meta:
        verbose_name = 'Логопедическая группа'
        verbose_name_plural = 'Логопедические группы'