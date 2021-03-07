# Generated by Django 3.1.7 on 2021-03-07 08:37

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('admin_panel', '0006_auto_20210307_1113'),
    ]

    operations = [
        migrations.AlterField(
            model_name='logogroups',
            name='pupils',
            field=models.ManyToManyField(to='admin_panel.Pupil', verbose_name='Ученики'),
        ),
        migrations.AlterField(
            model_name='logogroups',
            name='teacher',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL, verbose_name='Учитель-логопед'),
        ),
    ]
