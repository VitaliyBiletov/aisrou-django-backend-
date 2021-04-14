# Generated by Django 3.1.7 on 2021-04-14 10:48

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('admin_panel', '0037_auto_20210413_0705'),
    ]

    operations = [
        migrations.CreateModel(
            name='LogoGroups',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('custom_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL, verbose_name='Учитель')),
                ('pupil', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='admin_panel.pupil', verbose_name='Ученик')),
            ],
            options={
                'verbose_name': 'Логопедическая группа',
                'verbose_name_plural': 'Логопедические группы',
            },
        ),
    ]
