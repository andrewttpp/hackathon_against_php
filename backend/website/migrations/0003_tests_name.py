# Generated by Django 4.2.1 on 2023-07-30 19:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0002_alter_tests_slug_alter_user_name_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='tests',
            name='name',
            field=models.CharField(default='', max_length=1024),
        ),
    ]
