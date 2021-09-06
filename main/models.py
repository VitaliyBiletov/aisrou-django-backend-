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
    user = models.ForeignKey(
        CustomUser,
        verbose_name='Учитель',
        on_delete=models.CASCADE,
        null=True
    )
    pupil = models.ForeignKey(
        Pupil,
        verbose_name='Ученик',
        on_delete=models.CASCADE,
        null=True
    )
    date_of_creation = models.DateField(
        verbose_name='Дата создания'
    )

    current_class = models.IntegerField(
        verbose_name='Текущий класс',
        null=True
    )

    def __str__(self):
        return str(self.id)

    class Meta:
        verbose_name = 'Диагностика'
        verbose_name_plural = 'Диагностики'


class StatesOfFunctions(models.Model):
    diagnostic = models.ForeignKey(
        Diagnostics,
        verbose_name='ID_Диагностика',
        on_delete=models.CASCADE,
    )
    hearing = models.TextField(
        verbose_name='Слух',
        default='',
        blank=True,
    )
    vision = models.TextField(
        verbose_name='Зрение',
        default='',
        blank=True,
    )
    breath = models.TextField(
        verbose_name='Дыхание',
        default='',
        blank=True,
    )
    voice = models.TextField(
        verbose_name='Голос',
        default='',
        blank=True,
    )
    prosody = models.TextField(
        verbose_name='Просодика',
        default='',
        blank=True,
    )
    articulation_apparatus = models.TextField(
        verbose_name='Артикуляционный аппарат',
        default='',
        blank=True,
    )
    motor_skills = models.TextField(
        verbose_name='Моторика',
        default='',
        blank=True,
    )
    additional_information = models.TextField(
        verbose_name='Дополнительная информация',
        default='',
        blank=True,
    )

    class Meta:
        verbose_name = 'Состояние функций'
        verbose_name_plural = 'Состояния функций'

    def __str__(self):
        return 'id {} : Диагностика {}'.format(self.id, self.diagnostic)


class SensoMotorLevel(models.Model):
    diagnostic = models.ForeignKey(
        Diagnostics,
        verbose_name='ID_Диагностика',
        on_delete=models.CASCADE,
    )

    phonemic_perception = models.CharField(
        verbose_name='Фонематическое воспритятие',
        blank=True,
        null=True,
        max_length=100,
    )

    sound_pronunciation = models.CharField(
        verbose_name='Звукопроизношение',
        blank=True,
        null=True,
        max_length=350,
    )

    sound_syllable_structure = models.CharField(
        verbose_name='Звуко-слоговая структура',
        blank=True,
        null=True,
        max_length=100,
    )

    class Meta:
        verbose_name = 'Сенсо-моторный уровень'
        verbose_name_plural = 'Сенсо-моторный уровень'