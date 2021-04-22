from django.db import models
from datetime import datetime
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    patronymic = models.CharField('Отчество', max_length=50, blank=True, null=True)

    class Meta(AbstractUser.Meta):
        pass

    def __str__(self):
        return "{} {} {}".format(self.last_name, self.first_name, self.patronymic)


class ArticulatoryMotorSkills(models.Model):
    repeat = models.IntegerField('Повтори', null=True, blank=True, choices=[(0, '0'),
                                                                            (1, '1'),
                                                                            (2, '2'),
                                                                            (3, '3')
                                                                            ])


class Diagnostics(models.Model):
    date_create = models.DateField(auto_now=datetime)

    def __str__(self):
        return str(self.date_create)