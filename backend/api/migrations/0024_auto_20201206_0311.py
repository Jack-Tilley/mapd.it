# Generated by Django 3.1.3 on 2020-12-06 03:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0023_auto_20201128_0440'),
    ]

    operations = [
        migrations.AddField(
            model_name='historicalnode',
            name='image',
            field=models.TextField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='node',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='images/'),
        ),
    ]
