from django.db import models
from mptt.models import MPTTModel, TreeForeignKey
from django.db.models import JSONField

# Create your models here.


class Node(MPTTModel):
    label = models.CharField(max_length=50, null=True, blank=True)
    value = models.CharField(
        max_length=200, unique=True, null=True, blank=True)
    parent = TreeForeignKey('self', on_delete=models.CASCADE,
                            null=True, blank=True, related_name='children')
    apiPath = models.CharField(max_length=200, blank=True, null=True)
    nodeType = models.CharField(max_length=20, blank=True, null=True)
    nodeReference = JSONField(blank=True, null=True)

    # def __str__(self):
    #     return self.label

    class MPTTMETA:
        order_insertion_by = ['label']
