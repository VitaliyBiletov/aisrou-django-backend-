from django.db import models
from datetime import datetime
from django.contrib.auth.models import User, Group, AbstractUser


class CustomUser(AbstractUser):
    patronymic = models.CharField(
        'Отчество',
        max_length=50,
        blank=True,
        null=True
    )

    class Meta(AbstractUser.Meta):
        pass

    def __str__(self):
        return "{} {} {}".format(self.last_name, self.first_name, self.patronymic)


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


class LogoGroups(models.Model):
    custom_user = models.ForeignKey(
        CustomUser,
        verbose_name='Учитель',
        on_delete=models.CASCADE,
        null=True,
    )

    pupil = models.ForeignKey(
        Pupil,
        verbose_name='Ученик',
        on_delete=models.CASCADE,
        null=True
    )

    class Meta:
        verbose_name = 'Логопедическая группа'
        verbose_name_plural = 'Логопедические группы'