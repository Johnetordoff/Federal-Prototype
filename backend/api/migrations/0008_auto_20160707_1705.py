# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-07-07 17:05
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_doctest'),
    ]

    operations = [
        migrations.AlterField(
            model_name='doctest',
            name='file',
            field=models.FileField(upload_to='uploads/'),
        ),
    ]
