from django.templatetags.static import static
from django.utils.html import format_html
from wagtail import hooks

from graphql_auth.queries import MeQuery

@hooks.register("insert_global_admin_css")
def insert_global_admin_css():
    return format_html(
        '<link rel="stylesheet" type="text/css" href="{}">',
        static("pipit/admin-overrides.css"),
    )
    

@hooks.register("register_schema_mutation")
def register_mutation_class(mutation_mixins):
    from customuser.graphql.mutuations import Mutation

    mutation_mixins.append(Mutation)

# @hooks.register("register_schema_query")
# def add_my_custom_query(query_mixins):
#     from graphql_auth.schema import MyQuery
#     query_mixins.append(MyQuery)  # if defined as mixin, or just CustomQuery if defined as a class

# @hooks.register("register_schema_subscription")
# def register_example_subscription(subscription_mixins):
#     subscription_mixins.append(Subscription)

