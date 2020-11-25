from django.contrib import admin
from simple_history.admin import SimpleHistoryAdmin
from .models import Node, Team


class NodeAdmin(SimpleHistoryAdmin):

    list_display = ['label', 'value', 'parent',
                    'apiPath', 'nodeType', 'modified']
    history_list_display = ['label', 'value', 'parent',
                            'apiPath' 'modified', 'latLngArr']
    search_fields = ['label']


# class NodeHistoryAdmin(SimpleHistoryAdmin):
#     list_display = ['label', 'value', 'parent', 'modified', 'iconValue']
#     history_list_display = ["label"]
#     search_fields = ['label']

admin.site.register(Node, NodeAdmin)
admin.site.register(Team)
# admin.site.register(NodeHistory, NodeHistoryAdmin)
