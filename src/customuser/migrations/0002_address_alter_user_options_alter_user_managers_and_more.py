# Generated by Django 5.0.1 on 2024-03-06 03:02

import customuser.models
import django.db.models.deletion
import django.utils.timezone
import django_countries.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("customuser", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Address",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("first_name", models.CharField(blank=True, max_length=256)),
                ("last_name", models.CharField(blank=True, max_length=256)),
                ("company_name", models.CharField(blank=True, max_length=256)),
                ("street_address_1", models.CharField(blank=True, max_length=256)),
                ("street_address_2", models.CharField(blank=True, max_length=256)),
                ("city", models.CharField(blank=True, max_length=256)),
                ("city_area", models.CharField(blank=True, max_length=128)),
                ("postal_code", models.CharField(blank=True, max_length=20)),
                ("country", django_countries.fields.CountryField(max_length=2)),
                ("country_area", models.CharField(blank=True, max_length=128)),
                (
                    "phone",
                    customuser.models.PossiblePhoneNumberField(
                        blank=True,
                        db_index=True,
                        default="",
                        max_length=128,
                        region=None,
                    ),
                ),
            ],
            options={
                "ordering": ("pk",),
            },
        ),
        migrations.AlterModelOptions(
            name="user",
            options={"ordering": ("email",)},
        ),
        migrations.AlterModelManagers(
            name="user",
            managers=[],
        ),
        migrations.AddField(
            model_name="user",
            name="is_confirmed",
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name="user",
            name="last_confirm_email_request",
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="user",
            name="last_password_reset_request",
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="user",
            name="note",
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="user",
            name="role",
            field=models.CharField(
                choices=[("EE", "Employee"), ("ER", "Employer")],
                default="ER",
                max_length=50,
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="user",
            name="updated_at",
            field=models.DateTimeField(auto_now=True, db_index=True),
        ),
        migrations.AlterField(
            model_name="user",
            name="date_joined",
            field=models.DateTimeField(
                default=django.utils.timezone.now, editable=False
            ),
        ),
        migrations.AlterField(
            model_name="user",
            name="email",
            field=models.EmailField(max_length=254, unique=True),
        ),
        migrations.AlterField(
            model_name="user",
            name="first_name",
            field=models.CharField(blank=True, max_length=256),
        ),
        migrations.AlterField(
            model_name="user",
            name="is_active",
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name="user",
            name="is_staff",
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name="user",
            name="last_name",
            field=models.CharField(blank=True, max_length=256),
        ),
        migrations.AddField(
            model_name="user",
            name="addresses",
            field=models.ManyToManyField(
                blank=True, related_name="user_addresses", to="customuser.address"
            ),
        ),
        migrations.AddField(
            model_name="user",
            name="default_billing_address",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="+",
                to="customuser.address",
            ),
        ),
        migrations.AddField(
            model_name="user",
            name="default_shipping_address",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="+",
                to="customuser.address",
            ),
        ),
    ]
