from django.db import models
from datetime import datetime
from django.contrib.auth.models import User


class Pupil(models.Model):
    last_name = models.CharField('Фамилия', max_length=50)
    first_name = models.CharField('Имя', max_length=50)
    date = models.DateField('Дата', default=datetime.now)
    teacher = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.last_name

    class Meta:
        verbose_name = 'Ученик'
        verbose_name_plural = 'Ученики'
