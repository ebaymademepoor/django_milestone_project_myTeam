# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2019-03-08 12:54
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profile_and_stats', '0001_initial'),
        ('matches', '0002_auto_20190308_1230'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='matchdata',
            name='players',
        ),
        migrations.AddField(
            model_name='matchdata',
            name='players',
            field=models.ManyToManyField(null=True, to='profile_and_stats.UserProfileData'),
        ),
    ]
