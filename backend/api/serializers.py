from rest_framework import serializers
from .models import Node, Team, Profile, Comment, Image
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
                  'nodeType', 'latLngArr', 'isDir', "iconValue", 'color', "created", "modified", "description", 'children')


class HistorySerializer(serializers.ModelSerializer):
    history = serializers.SerializerMethodField()

    def get_history(self, obj):
        return obj.history.all().values()

    class Meta:
        model = Node
        fields = ['history']


class TeamHistorySerializer(serializers.ModelSerializer):
    history = serializers.SerializerMethodField()

    def get_history(self, obj):
        return obj.history.all().values()

    class Meta:
        model = Team
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


class TeamMembersSerializer(serializers.ModelSerializer):
    profiles = ProfileInfoSerializer(
        many=True, read_only=True, source="profile_set")

    # def get_nodevals(self, obj):
    #     return obj.nodes.all().values()

    class Meta:
        model = Team
        fields = ('id', 'name', 'description',
                  'unique_key', 'profiles')


class CommentSerializer(serializers.ModelSerializer):
    profile = ProfileInfoSerializer(many=False, read_only=True)

    class Meta:
        model = Comment
        fields = ('id', 'node', 'content', 'profile', 'created')


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('id', 'image', 'title', 'description', 'node', 'created')


class BaseCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('node', 'content', 'profile', 'created')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')


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
