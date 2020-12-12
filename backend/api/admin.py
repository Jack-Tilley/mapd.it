from django.contrib import admin
from simple_history.admin import SimpleHistoryAdmin
from .models import Node, Team, Profile, Comment, Image


class NodeAdmin(SimpleHistoryAdmin):

    list_display = ['label', 'parent',
                    'nodeType', 'modified']
    history_list_display = ['label', 'parent',
                            'modified', 'latLngArr']
    search_fields = ['label']


class TeamAdmin(SimpleHistoryAdmin):

    list_display = ['id', 'name',
                    'description']
    list_display = ['id', 'name',
                    'description']
    search_fields = ['name']


# class NodeHistoryAdmin(SimpleHistoryAdmin):
#     list_display = ['label', 'value', 'parent', 'modified', 'iconValue']
#     history_list_display = ["label"]
#     search_fields = ['label']

admin.site.register(Node, NodeAdmin)
admin.site.register(Team, TeamAdmin)
admin.site.register(Profile)
admin.site.register(Comment)
admin.site.register(Image)
# admin.site.register(NodeHistory, NodeHistoryAdmin)
