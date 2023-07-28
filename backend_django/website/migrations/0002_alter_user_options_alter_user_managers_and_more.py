# Generated by Django 4.2.3 on 2023-07-28 09:33

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='user',
            options={'ordering': ('-id',), 'verbose_name': 'Пользователь', 'verbose_name_plural': 'Пользователи'},
        ),
        migrations.AlterModelManagers(
            name='user',
            managers=[
            ],
        ),
        migrations.RemoveField(
            model_name='user',
            name='is_verified',
        ),
        migrations.AddIndex(
            model_name='user',
            index=models.Index(fields=['-id'], name='website_use_id_98452b_idx'),
        ),
    ]