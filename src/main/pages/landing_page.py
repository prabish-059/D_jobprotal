from main.blocks import section_blocks
from wagtail.models import Page
from wagtail.fields import StreamField
from wagtail.admin.panels import FieldPanel
from wagtail.search import index
from grapple.helpers import register_query_field
from grapple.models import GraphQLStreamfield
from wagtail.models import PageManager

from wagtail_headless_preview.models import HeadlessPreviewMixin
from django.utils.translation import gettext_lazy as _
from .base import BasePage

@register_query_field("landing_page")
class LandingPage(HeadlessPreviewMixin, BasePage):
    body = StreamField(section_blocks,use_json_field=True,)

    graphql_fields = [
        GraphQLStreamfield("body"),
    ]

    search_fields = Page.search_fields + [

        index.SearchField("body"),
    ]

    extra_panels = BasePage.extra_panels

    content_panels = Page.content_panels + [
        # FieldPanel("intro"),
        FieldPanel("body", classname="full"),
    ]
    objects: PageManager
    class Meta:
        verbose_name = _("Business Landing Page")
