# Generated by Django 5.0.1 on 2024-03-04 10:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("main", "0002_homepage_body"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="homepage",
            name="body",
        ),
    ]
