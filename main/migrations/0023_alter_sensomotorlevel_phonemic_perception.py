# Generated by Django 3.2.6 on 2021-08-27 07:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0022_alter_sensomotorlevel_phonemic_perception'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sensomotorlevel',
            name='phonemic_perception',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='Фонематическое воспритятие'),
        ),
    ]
