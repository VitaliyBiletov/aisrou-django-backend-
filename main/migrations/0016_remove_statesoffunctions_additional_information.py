# Generated by Django 3.1.7 on 2021-08-12 22:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0015_sensomotorlevel'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='statesoffunctions',
            name='additional_information',
        ),
    ]
