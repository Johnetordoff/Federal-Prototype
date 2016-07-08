# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-07-07 16:14
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Department',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Document',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_submitted', models.DateTimeField(auto_now_add=True)),
                ('date_published', models.DateTimeField()),
                ('title', models.CharField(max_length=200)),
                ('publisher', models.CharField(max_length=100)),
                ('institution', models.CharField(max_length=100)),
                ('status', models.CharField(choices=[(1, 'read'), (2, 'unread'), (3, 'archived')], max_length=50)),
                ('file_link', models.CharField(max_length=200)),
                ('PI_first_name', models.CharField(max_length=50)),
                ('PI_last_name', models.CharField(max_length=50)),
                ('PI_email', models.EmailField(max_length=100)),
                ('author_list', models.CharField(max_length=500)),
                ('department', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='document', to='api.Department')),
            ],
            options={
                'permissions': (('view_document', 'View document'),),
            },
        ),
        migrations.CreateModel(
            name='Grant',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.CharField(max_length=100)),
                ('department', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='grants', to='api.Department')),
                ('document', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='grants', to='api.Document')),
            ],
            options={
                'permissions': (('view_grant', 'View Grant'),),
            },
        ),
        migrations.CreateModel(
            name='Usertype',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('usertype', models.CharField(choices=[(1, 'researcher'), (2, 'manager')], max_length=50)),
                ('department', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='manager', to='api.Department')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
