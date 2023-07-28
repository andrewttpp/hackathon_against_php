from django.contrib.auth import BaseUserManager
from django.contrib.auth import AbstractUser
from django.db import models


class Groups(models.Model):
    name = models.CharField(max_length=255, unique=True, verbose_name='Название группы')


class Programs(models.Model):
    name = models.CharField(max_length=255, unique=True, verbose_name='Название программы')


class Competencies(models.Model):
    name = models.CharField(max_length=255, unique=True, verbose_name='Название компетенции')


class Disciplines(models.Model):
    name = models.CharField(max_length=255, unique=True, verbose_name='Название дисциплины')


class Specialties(models.Model):
    name = models.CharField(max_length=255, unique=True, verbose_name='Название дисциплины')


class UserManager(BaseUserManager):

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('Поле email не может быть пустым! ')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        user = self._create_user(email, password, **extra_fields)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)


class User(AbstractUser):
    email = models.EmailField(max_length=255, unique=True, verbose_name='E-mail')
    username = None
    group = models.ForeignKey('Groups', on_delete=models.CASCADE, null=True)
    first_name = None
    last_name = None
    name = models.CharField(verbose_name='Имя', null=True)
    surname = models.CharField(verbose_name='Фамилия', null=True)
    patronymic = models.CharField(verbose_name='Отчество', null=True)
    card_number = models.IntegerField(null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    class Meta:
        ordering = ('-id',)
        indexes = [models.Index(fields=['-id'])]
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    def __str__(self):
        if self.is_superuser:
            who_is = 'Администратор'
        elif self.is_staff:
            who_is = 'Преподаватель'
        else:
            who_is = 'Студент'

        return f'{who_is} {self.name} {self.surname} {self.patronymic}'


class Tests(models.Model):
    user_create = models.ForeignKey('User', on_delete=models.CASCADE)
    group = models.ForeignKey('Groups', on_delete=models.CASCADE)


class Pool(models.Model):
    test = models.ForeignKey('Tests', on_delete=models.CASCADE)
    question = models.CharField(verbose_name='Вопрос')
