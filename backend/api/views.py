from django.shortcuts import render
from rest_framework import viewsets
from .serializers import NodeSerializer
from .models import Node


class NodeView(viewsets.ModelViewSet):
    serializer_class = NodeSerializer
    queryset = Node.objects.all()
