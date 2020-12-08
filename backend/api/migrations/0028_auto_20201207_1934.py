# Generated by Django 3.1.3 on 2020-12-07 19:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0027_auto_20201207_1738'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='historicalnode',
            name='image',
        ),
        migrations.RemoveField(
            model_name='node',
            name='image',
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='images/')),
                ('description', models.CharField(blank=True, max_length=128, null=True)),
                ('node', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='api.node')),
            ],
        ),
    ]
