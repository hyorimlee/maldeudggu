# Generated by Django 4.0.3 on 2022-03-25 04:02

import dialects.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Audio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('audio_path', models.FileField(blank=True, upload_to=dialects.models.audio_file_path)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Sentence',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sentence', models.CharField(max_length=64)),
            ],
        ),
        migrations.CreateModel(
            name='Case',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image_url', models.URLField(null=True)),
                ('result', models.CharField(max_length=128, null=True)),
                ('sentences', models.ManyToManyField(through='dialects.Audio', to='dialects.sentence')),
            ],
        ),
        migrations.AddField(
            model_name='audio',
            name='case',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dialects.case'),
        ),
        migrations.AddField(
            model_name='audio',
            name='sentence',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dialects.sentence'),
        ),
    ]