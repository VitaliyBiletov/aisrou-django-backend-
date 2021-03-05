from django.db import models
from datetime import datetime


class Pupil(models.Model):
    last_name = models.CharField('Фамилия', max_length=50)
    first_name = models.CharField('Имя', max_length=50)
    date = models.DateField('Дата', default=datetime.now)

    def __str__(self):
        return self.last_name

    class Meta:
        verbose_name = 'Ученик'
        verbose_name_plural = 'Ученики'
