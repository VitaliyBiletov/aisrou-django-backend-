# Generated by Django 3.1.7 on 2021-05-27 07:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('admin_panel', '0002_pupil_date_of_birth'),
    ]

    operations = [
        migrations.AddField(
            model_name='pupil',
            name='home_address',
            field=models.CharField(max_length=100, null=True, verbose_name='Домашний адрес'),
        ),
    ]