# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-07-06 18:53
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20160705_2051'),
    ]

    operations = [
        migrations.AlterField(
            model_name='document',
            name='file_link',
            field=models.FileField(upload_to='documents/%Y/%m/%d'),
        ),
    ]
