# Generated by Django 3.2.6 on 2021-08-27 06:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0020_alter_sensomotorlevel_phonemic_perception'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sensomotorlevel',
            name='phonemic_perception',
            field=models.TextField(blank=True, null=True, verbose_name='Фонематическое воспритятие'),
        ),
    ]