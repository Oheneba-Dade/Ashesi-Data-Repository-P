# Generated by Django 5.1.6 on 2025-03-03 19:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ADRP', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='collection',
            name='view_count',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='datasetfile',
            name='download_count',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='otp',
            name='life_time_mins',
            field=models.IntegerField(default=5),
        ),
    ]
