# Generated by Django 5.1.6 on 2025-04-02 07:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ADRP', '0009_remove_collection_missing_values'),
    ]

    operations = [
        migrations.AlterField(
            model_name='collection',
            name='doi_link',
            field=models.URLField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]
