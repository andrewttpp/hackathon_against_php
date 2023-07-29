from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models


class Groups(models.Model):
    name = models.CharField(max_length=255, unique=True, verbose_name='Название группы')

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('name',)
        verbose_name = 'Группа'
        verbose_name_plural = 'Группы'


class Levels(models.Model):
    name = models.CharField(max_length=255, unique=True, verbose_name='Название уровня')

    class Meta:
        ordering = ('name',)
        verbose_name = 'Уровень образования'
        verbose_name_plural = 'Уровни образования'

    def __str__(self):
        return self.name


class Programs(models.Model):
    code = models.ForeignKey('Specialties', on_delete=models.CASCADE, verbose_name='Направление',
                             related_name='programs')
    name = models.CharField(max_length=255, unique=True, verbose_name='Название образовательной программы')

    class Meta:
        ordering = ('name',)
        verbose_name = 'Образовательная программа'
        verbose_name_plural = 'Образовательные программы'

    def __str__(self):
        return self.name


class Competencies(models.Model):
    name = models.CharField(max_length=255, unique=True, verbose_name='Название компетенции')

    class Meta:
        ordering = ('name',)
        verbose_name = 'Компетенция'
        verbose_name_plural = 'Компетенции'

    def __str__(self):
        return self.name


class Disciplines(models.Model):
    name = models.CharField(max_length=255, unique=True, verbose_name='Название дисциплины')

    def __str__(self):
        return self.name


class Specialties(models.Model):
    level = models.ForeignKey('Levels', on_delete=models.CASCADE, verbose_name='Уровень образования',
                              related_name='specialties')
    code = models.CharField(max_length=255, unique=True, verbose_name='Код специальности')
    name = models.CharField(max_length=255, unique=True, verbose_name='Название специальности')

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('name',)
        verbose_name = 'Специальность'
        verbose_name_plural = 'Специальности'


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
    group = models.ForeignKey('Groups', on_delete=models.CASCADE, null=True, blank=True, verbose_name='Группа')
    first_name = None
    last_name = None
    name = models.CharField(verbose_name='Имя', blank=True, null=True)
    surname = models.CharField(verbose_name='Фамилия', blank=True, null=True)
    patronymic = models.CharField(verbose_name='Отчество', blank=True, null=True)
    card_number = models.IntegerField(null=True, blank=True, verbose_name='Номер зачетки')

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
