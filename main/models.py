from django.db import models


class Class(models.Model):
    name = models.CharField(default='', max_length=50, verbose_name='Название')
    number_class = models.IntegerField(verbose_name='Номер класса')

    class Meta:
        verbose_name = 'Класс'
        verbose_name_plural = 'Классы'

    def __str__(self):
        return self.name


class Pupil(models.Model):
    last_name = models.CharField('Фамилия', max_length=50)
    first_name = models.CharField('Имя', max_length=50)
    class_number = models.ForeignKey(
        Class,
        verbose_name='Класс',
        on_delete=models.PROTECT
    )

    def __str__(self):
        return self.last_name

    class Meta:
        verbose_name = 'Ученик'
        verbose_name_plural = 'Ученики'
