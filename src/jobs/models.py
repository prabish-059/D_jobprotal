from django.db import models
from django.urls import reverse
from django.utils import timezone

from customuser.models import User
from grapple.helpers import (
    register_paginated_query_field,
    register_query_field,
    register_singular_query_field,
)
from wagtail.snippets.models import register_snippet
from .manager import JobManager
from grapple.models import (GraphQLBoolean,
GraphQLForeignKey,GraphQLString,
GraphQLInt)
import graphene
from graphene_django import DjangoObjectType


JOB_TYPE = (("Full-time", "Full time"), ("Part time", "Part time"), ("Contract", "Contract"))


@register_snippet
@register_query_field(
    "job",
    "jobs",
    query_params={"id": graphene.String()},
    required=True,
    plural_required=True,
    plural_item_required=True,
)
class Job(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=300)
    description = models.TextField()
    location = models.CharField(max_length=150)
    type = models.CharField(choices=JOB_TYPE, max_length=10)
    category = models.CharField(max_length=100)
    last_date = models.DateTimeField()
    website = models.CharField(max_length=100, default="")
    
    created_at = models.DateTimeField(default=timezone.now)
    filled = models.BooleanField(default=False)
    salary = models.IntegerField(default=0, blank=True)
    vacancy = models.IntegerField(default=1)

    objects = JobManager()

    class Meta:
        ordering = ["id"]

    def get_absolute_url(self):
        return reverse("jobs:jobs-detail", args=[self.id])

    def __str__(self):
        return self.title

    graphql_fields = [
        GraphQLString("title", required=True),
        GraphQLString("description", required=True),
        GraphQLString("location", required=True),
        GraphQLString("type"),
        GraphQLString("category"),
        GraphQLString("lastdate"),
        GraphQLString("website"),
        GraphQLString("created_at"),
        GraphQLBoolean("filled"),
        GraphQLString("salary"),
        GraphQLInt("vacancy"),
        GraphQLForeignKey("user", "customUser.User"),
    ]


@register_snippet
@register_query_field("job_applicant")
class Applicant(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name="applicants")
    created_at = models.DateTimeField(default=timezone.now)
    comment = models.TextField(blank=True, null=True)
    status = models.SmallIntegerField(default=1)

    class Meta:
        ordering = ["id"]
        unique_together = ["user", "job"]

    def __str__(self):
        return self.user.get_full_name()

    @property
    def get_status(self):
        if self.status == 1:
            return "Pending"
        elif self.status == 2:
            return "Accepted"
        else:
            return "Rejected"


class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name="favorites")
    created_at = models.DateTimeField(default=timezone.now)
    soft_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.job.title
