from django.shortcuts import render
from rest_framework import viewsets
from .serializers import NodeSerializer, HistorySerializer, TeamSerializer, ProfileSerializer
from .models import Node, Team, Profile
from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import RegisterSerializer
from django.contrib.auth.models import User

from django.contrib.auth import login

from rest_framework import permissions
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from rest_framework.decorators import action


class NodeView(viewsets.ModelViewSet):
    serializer_class = NodeSerializer
    queryset = Node.objects.filter(parent=None)


class AllNodesView(viewsets.ModelViewSet):
    # this view should probably be the same as NodeView at somepoint
    serializer_class = NodeSerializer
    queryset = Node.objects.all()


class TeamsView(viewsets.ModelViewSet):
    # this view should probably be the same as NodeView at somepoint
    serializer_class = TeamSerializer
    queryset = Team.objects.all()

    @action(detail=True, methods=['get'], serializer_class=NodeSerializer)
    def nodes(self, request, pk=None):
        """
        Returns a list of all the nodes that the given
        team owns.
        """
        print(request.data)
        team = self.get_object()
        nodes = team.nodes.all()
        return Response(nodes.values())

    @action(detail=True, methods=['post'])
    def update_nodes(self, request, pk=None):
        """
        Returns a list of all the nodes that the given
        team owns.
        """
        print(request.data)
        node = Node.objects.get(id=request.data['id'])
        team = self.get_object()
        team.nodes.add(node)
        team.save()
        nodes = team.nodes.all()
        return Response(nodes.values())


class ProfilesView(viewsets.ModelViewSet):
    # this view should probably be the same as NodeView at somepoint
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()


class HistoryView(viewsets.ModelViewSet):
    serializer_class = HistorySerializer
    queryset = Node.objects.all()

# Register API


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": ProfileSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class LoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        u = Profile.objects.filter(user=user)
        profile = u.values('id').first()
        user_id = user.id
        login(request, user)
        res = super(LoginAPI, self).post(request, format=None)
        res.data['user_id'] = user_id
        res.data['profile_id'] = profile['id']

        return Response(res.data)
        # return super(LoginAPI, self).post(request, format=None)
