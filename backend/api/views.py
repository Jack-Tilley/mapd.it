from django.shortcuts import render
from rest_framework import viewsets
from .serializers import NodeSerializer, HistorySerializer, TeamSerializer, ProfileSerializer, CommentSerializer, ProfileInfoSerializer, BaseCommentSerializer, ImageSerializer
from .models import Node, Team, Profile, Comment, Image
from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import RegisterSerializer
from django.contrib.auth.models import User
from rest_framework import status

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

    @action(detail=True, methods=['get'])
    def comments(self, request, pk=None):
        node = self.get_object()
        comments = node.comments.all()
        return Response(CommentSerializer(comments, many=True).data)

    @action(detail=True, methods=['get'])
    def images(self, request, pk=None):
        node = self.get_object()
        images = node.images.all()
        return Response(ImageSerializer(images, many=True).data)


class TeamsView(viewsets.ModelViewSet):
    # this view should probably be the same as NodeView at somepoint
    serializer_class = TeamSerializer
    queryset = Team.objects.all()

    @ action(detail=True, methods=['get'], serializer_class=NodeSerializer)
    def nodes(self, request, pk=None):
        """
        Returns a list of all the nodes that the given
        team owns.
        """
        print(request.data)
        team = self.get_object()
        nodes = team.nodes.all()
        return Response(nodes.values())

    @ action(detail=True, methods=['post'])
    def update_nodes(self, request, pk=None):
        """
        Updates the list of all the nodes that the given
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

    @ action(detail=True, methods=['put'])
    def join_team(self, request, pk=None):
        """
        joins a team that the given profile requests
        """
        print(request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        team = Team.objects.get(unique_key=request.data['unique_key'])
        pfile = self.get_object()
        # maybe check that the user is already on this team before adding
        pfile.teams.add(team)
        profile = pfile.save()
        return Response(ProfileSerializer(profile, context=self.get_serializer_context()).data)

    @ action(detail=True, methods=['put'])
    def leave_team(self, request, pk=None):
        """
        leaves a team that the given profile is subscribed to
        """
        print(request.data)
        team = Team.objects.get(id=request.data['id'])
        profile = self.get_object()
        profile.teams.remove(team)
        profile.save()
        teams = profile.teams.all()
        return Response(teams.values())

    @ action(detail=True, methods=['get'])
    def view_teams(self, request, pk=None):
        """
        views the teams the given user is subscribed to
        """
        print(request.data)
        profile = self.get_object()
        teams = profile.teams.all()
        res = []
        for team in teams:
            # profs = Profile.objects.filter(teams=team).values()
            # for prof in profs:
            #     print(ProfileSerializer(
            #         prof, context=self.get_serializer_context()).data)
            data = {"id": team.id, "name": team.name, "description": team.description, "unique_key": team.unique_key, "members": list(
                Profile.objects.filter(teams=team).values())}
            res.append(data)
        print(res)
        return Response(res)


class CommentsView(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()


class BaseCommentsView(viewsets.ModelViewSet):
    serializer_class = BaseCommentSerializer
    queryset = Comment.objects.all()


class ImagesView(viewsets.ModelViewSet):
    serializer_class = ImageSerializer
    queryset = Image.objects.all()


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
