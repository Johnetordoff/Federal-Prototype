# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-07-07 15:33
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20160706_1853'),
    ]

    operations = [
        migrations.AlterField(
            model_name='document',
            name='file_link',
            field=models.FileField(upload_to='uploads/%Y/%m/%d'),
        ),
    ]
