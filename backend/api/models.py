from django.db import models
from mptt.models import MPTTModel, TreeForeignKey
from django.db.models import JSONField
from django.contrib.postgres.fields import ArrayField
from simple_history import register


# classic node model
class Node(MPTTModel):
    label = models.CharField(max_length=50, null=True, blank=True)
    value = models.CharField(
        max_length=200, unique=True, null=True, blank=True)
    parent = TreeForeignKey('self', on_delete=models.CASCADE,
                            null=True, blank=True, related_name='children')
    apiPath = models.CharField(max_length=200, blank=True, null=True)
    nodeType = models.CharField(max_length=20, blank=True, null=True)
    latLngArr = ArrayField(models.CharField(max_length=40), blank=True)
    # unused should be removed
    nodeReference = JSONField(blank=True, null=True)
    isDir = models.BooleanField(default=False)
    icon = models.CharField(max_length=30, blank=True, null=True)
    iconValue = models.CharField(max_length=30, blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    # def __str__(self):
    #     return self.label

    class MPTTMETA:
        order_insertion_by = ['label']


register(Node)
