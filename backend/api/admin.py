from django.contrib import admin
from .models import Node


class NodeAdmin(admin.ModelAdmin):

    list_display = ('label', 'value', 'parent',
                    'apiPath', 'nodeType', 'nodeReference')


admin.site.register(Node, NodeAdmin)
