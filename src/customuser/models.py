from django.contrib.auth.models import AbstractUser
from functools import partial

from uuid import uuid4
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.db import models
from django.db.models import Value
from django.forms.models import model_to_dict
from django.utils import timezone
from django.utils.crypto import get_random_string
from django_countries.fields import Country, CountryField
from phonenumber_field.modelfields import PhoneNumber, PhoneNumberField

# from ..site.models import SiteSettings

from .validators import validate_possible_number
from wagtail.snippets.models import register_snippet


USER_ROLES = {
    "employee": "Employee",
    "employer": "Employer",

}

class PossiblePhoneNumberField(PhoneNumberField):
    """Less strict field for phone numbers written to database."""

    default_validators = [validate_possible_number]


class AddressQueryset(models.QuerySet["Address"]):
    def annotate_default(self, user):
        # Set default factory/office address pk to None
        # if default factory/office address doesn't exist
        default_factory_address_pk, default_office_address_pk = None, None
        if user.default_factory_address:
            default_factory_address_pk = user.default_factory_address.pk
        if user.default_office_address:
            default_office_address_pk = user.default_office_address.pk

        return user.addresses.annotate(
            user_default_factory_address_pk=Value(
                default_factory_address_pk, models.IntegerField()
            ),
            user_default_office_address_pk=Value(
                default_office_address_pk, models.IntegerField()
            ),
        )


AddressManager = models.Manager.from_queryset(AddressQueryset)

@register_snippet
class Address(models.Model):
    first_name = models.CharField(max_length=256, blank=True)
    last_name = models.CharField(max_length=256, blank=True)
    company_name = models.CharField(max_length=256, blank=True)
    street_address_1 = models.CharField(max_length=256, blank=True)
    street_address_2 = models.CharField(max_length=256, blank=True)
    city = models.CharField(max_length=256, blank=True)
    city_area = models.CharField(max_length=128, blank=True)
    postal_code = models.CharField(max_length=20, blank=True)
    country = models.CharField(max_length=200,  blank=True, choices=CountryField().choices + [('', 'Select Country')])
    country_area = models.CharField(max_length=128, blank=True)
    phone = PossiblePhoneNumberField(blank=True, default="", db_index=True)

    objects = AddressManager()

    class Meta:
        ordering = ("pk",)

    def __eq__(self, other):
        if not isinstance(other, Address):
            return False
        return self.as_data() == other.as_data()

    __hash__ = models.Model.__hash__

    def as_data(self):
        """Return the address as a dict suitable for passing as kwargs.

        Result does not contain the primary key or an associated user.
        """
        data = model_to_dict(self, exclude=["id", "user"])
        if isinstance(data["country"], Country):
            data["country"] = data["country"].code
        if isinstance(data["phone"], PhoneNumber):
            data["phone"] = data["phone"].as_e164
        return data

    def get_copy(self):
        """Return a new instance of the same address."""
        return Address.objects.create(**self.as_data())


class UserManager(BaseUserManager["User"]):
    def create_user(
        self, email, password=None, is_staff=False, is_active=True, **extra_fields
    ):
        """Create a user instance with the given email and password."""
        email = UserManager.normalize_email(email)
        # Google OAuth2 backend send unnecessary username field
        extra_fields.pop("username", None)

        user = self.model(
            email=email, is_active=is_active, is_staff=is_staff, **extra_fields
        )
        if password:
            user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        user = self.create_user(
            email, password, is_staff=True, is_superuser=True, **extra_fields
        )
        return user

    def staff(self):
        return self.get_queryset().filter(is_staff=True)
    

    # use Orders for jobs
    # def customers(self):
    #     orders = Order.objects.values("user_id")
    #     return self.get_queryset().filter(
    #         Q(is_staff=False)
    #         | (Q(is_staff=True) & (Exists(orders.filter(user_id=OuterRef("pk")))))
    #     )


@register_snippet
class User(AbstractUser):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=256, blank=True)
    addresses = models.ManyToManyField(
        Address, blank=True, related_name="user_addresses"
    )
    role=models.CharField(choices=USER_ROLES, max_length=50)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_confirmed = models.BooleanField(default=True)
    last_confirm_email_request = models.DateTimeField(null=True, blank=True)
    note = models.TextField(null=True, blank=True)
    date_joined = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = models.DateTimeField(auto_now=True, db_index=True)
    last_password_reset_request = models.DateTimeField(null=True, blank=True)
    default_office_address = models.ForeignKey(
        Address, related_name="+", null=True, blank=True, on_delete=models.SET_NULL
    )
    default_factory_address = models.ForeignKey(
        Address, related_name="+", null=True, blank=True, on_delete=models.SET_NULL
    )
    # avatar = models.ImageField(upload_to="user-avatars", blank=True, null=True)
    objects = UserManager()


    class Meta:
        ordering = ("email",)


    def get_short_name(self):
        return self.email




