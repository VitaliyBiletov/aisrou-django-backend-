from django.db import models
from datetime import datetime
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    patronymic = models.CharField('Отчество',max_length=50, blank=True, null=True)

    class Meta(AbstractUser.Meta):
        pass



