# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2019-04-10 13:51
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('matches', '0026_auto_20190409_1134'),
    ]

    operations = [
        migrations.AlterField(
            model_name='matchdata',
            name='players',
            field=models.ManyToManyField(blank=True, related_name='linked_players', to='profile_and_stats.UserProfileData'),
        ),
    ]
