from django.db import models
from datetime import datetime
from django.contrib.auth.models import AbstractUser
from admin_panel.models import Pupil, CustomUser

# class CustomUser(AbstractUser):
#     patronymic = models.CharField('Отчество', max_length=50, blank=True, null=True)
#
#     class Meta(AbstractUser.Meta):
#         pass
#
#     def __str__(self):
#         return "{} {} {}".format(self.last_name, self.first_name, self.patronymic)


class Diagnostics(models.Model):
    user_id = models.ForeignKey(
        CustomUser,
        verbose_name='Учитель',
        on_delete=models.CASCADE,
        null=True
    )
    pupil_id = models.ForeignKey(
        Pupil,
        verbose_name='Ученик',
        on_delete=models.CASCADE,
        null=True
    )
    date_of_creation = models.DateField(
        auto_now=datetime,
        verbose_name='Дата создания'
    )

    def __str__(self):
        return str(self.id)

    class Meta:
        verbose_name = 'Диагностика'
        verbose_name_plural = 'Диагностики'


class StatesOfFunctions(models.Model):
    diagnostic_id = models.ForeignKey(
        Diagnostics,
        verbose_name='ID_Диагностика',
        on_delete=models.CASCADE,
        blank=True,
    )
    hearing = models.TextField(
        verbose_name='Слух',
        blank=True
    )
    vision = models.TextField(
        verbose_name='Зрение',
        blank=True
    )
    breath = models.TextField(
        verbose_name='Дыхание',
        blank=True
    )
    voice = models.TextField(
        verbose_name='Голос',
        blank=True
    )
    prosody = models.TextField(
        verbose_name='Просодика',
        blank=True
    )
    articulation_apparatus = models.TextField(
        verbose_name='Артикуляционный аппарат',
        blank=True
    )
    motor_skills = models.TextField(
        verbose_name='Моторика',
        blank=True
    )
    additional_information = models.TextField(
        verbose_name='Дополнительная информация',
        blank=True
    )

    class Meta:
        verbose_name = 'Состояние функций'
        verbose_name_plural = 'Состояния функций'