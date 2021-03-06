# Generated by Django 3.1.3 on 2020-12-09 22:42

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0029_auto_20201209_2240'),
    ]

    operations = [
        migrations.AlterField(
            model_name='historicalnode',
            name='value',
            field=models.CharField(db_index=True, default=uuid.uuid4, max_length=100),
        ),
        migrations.AlterField(
            model_name='node',
            name='value',
            field=models.CharField(default=uuid.uuid4, max_length=100, unique=True),
        ),
    ]
