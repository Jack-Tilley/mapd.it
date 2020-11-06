from rest_framework import serializers
from .models import Node


class NodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Node
        fields = ('id', 'label', 'value', 'parent',
                  'apiPath', 'nodeType', 'nodeReference')
