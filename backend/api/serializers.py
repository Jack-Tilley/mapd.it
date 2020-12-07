from rest_framework import serializers
from .models import Node, Team, Profile, Comment
import json
from django.core.serializers.json import DjangoJSONEncoder
from django.contrib.auth.models import User


class NodeSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    # adds children to each node
    def get_children(self, obj):
        return obj.get_children().values()

    class Meta:
        model = Node
        fields = ('id', 'label', 'value', 'parent',
                  'apiPath', 'nodeType', 'nodeReference', 'latLngArr', 'isDir', 'icon', "iconValue", 'color', "created", "modified", "description", "image", 'children')


class HistorySerializer(serializers.ModelSerializer):
    history = serializers.SerializerMethodField()

    def get_history(self, obj):
        return obj.history.all().values()

    class Meta:
        model = Node
        fields = ['history']

# User Serializer


class TeamSerializer(serializers.ModelSerializer):
    # nodevals = serializers.SerializerMethodField()
    nodes = NodeSerializer(many=True, read_only=True)

    # def get_nodevals(self, obj):
    #     return obj.nodes.all().values()

    class Meta:
        model = Team
        fields = ('id', 'name', 'description',
                  'unique_key', 'nodes')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    teams = TeamSerializer(many=True, read_only=True)

    class Meta:
        model = Profile
        fields = ('id', 'user', 'teams')


class ProfileInfoSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)

    class Meta:
        model = Profile
        fields = ('id', 'user')


class CommentSerializer(serializers.ModelSerializer):
    profile = ProfileInfoSerializer(many=False, read_only=True)

    class Meta:
        model = Comment
        fields = ('node', 'content', 'profile', 'created')


class BaseCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('node', 'content', 'profile', 'created')


# Register Serializer


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'], validated_data['email'], validated_data['password'])
        return user
