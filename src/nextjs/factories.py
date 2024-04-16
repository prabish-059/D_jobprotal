import factory
from wagtail.models import BaseViewRestriction, PageViewRestriction
from wagtail_factories import PageFactory


class PageViewRestrictionFactory(factory.django.DjangoModelFactory):
    page = factory.SubFactory(PageFactory)
    restriction_type = BaseViewRestriction.PASSWORD

    class Meta:
        model = PageViewRestriction
