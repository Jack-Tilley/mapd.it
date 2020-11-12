from rest_framework import serializers
from .models import Node
import json


class NodeSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    # adds children to each node
    def get_children(self, obj):
        return obj.get_children().values()

    class Meta:
        model = Node
        fields = ('id', 'label', 'value', 'parent',
                  'apiPath', 'nodeType', 'nodeReference', 'latLngArr', 'isDir', 'icon', 'children')
