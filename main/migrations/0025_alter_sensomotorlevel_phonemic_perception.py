# Generated by Django 3.2.6 on 2021-09-06 08:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0024_alter_sensomotorlevel_sound_pronunciation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sensomotorlevel',
            name='phonemic_perception',
            field=models.CharField(blank=True, default='0:None&1:None&2:None&3:None&4:None&5:None&6:None&7:None&8:None&9:None&10:None&11:None&12:None', max_length=100, null=True, verbose_name='Фонематическое воспритятие'),
        ),
    ]
