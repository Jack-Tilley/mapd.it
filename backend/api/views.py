from django.shortcuts import render
from rest_framework import viewsets
from .serializers import NodeSerializer, HistorySerializer
from .models import Node


class NodeView(viewsets.ModelViewSet):
    serializer_class = NodeSerializer
    queryset = Node.objects.filter(parent=None)


class AllNodesView(viewsets.ModelViewSet):
    # this view should probably be the same as NodeView at somepoint
    serializer_class = NodeSerializer
    queryset = Node.objects.all()


class HistoryView(viewsets.ModelViewSet):
    serializer_class = HistorySerializer
    queryset = Node.objects.all()
