# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2019-04-06 12:26
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profile_and_stats', '0004_auto_20190405_1041'),
    ]

    operations = [
        migrations.AddField(
            model_name='attributerating',
            name='last_updated',
            field=models.DateField(auto_now=True),
        ),
    ]