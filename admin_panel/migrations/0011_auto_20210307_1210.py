# Generated by Django 3.1.7 on 2021-03-07 09:10

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('admin_panel', '0010_auto_20210307_1155'),
    ]

    operations = [
        migrations.AddField(
            model_name='pupil',
            name='middle_name',
            field=models.CharField(max_length=50, null=True, verbose_name='Отчество'),
        ),
        migrations.AlterField(
            model_name='logogroups',
            name='pupils',
            field=models.ManyToManyField(to='admin_panel.Pupil', verbose_name='Ученики'),
        ),
        migrations.AlterField(
            model_name='pupil',
            name='date',
            field=models.DateField(default=datetime.datetime.now, verbose_name='Дата регистрации'),
        ),
    ]
