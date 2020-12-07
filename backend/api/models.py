from django.db import models
from mptt.models import MPTTModel, TreeForeignKey
from django.db.models import JSONField
from django.contrib.postgres.fields import ArrayField
from simple_history import register
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.validators import MinLengthValidator
from .utils import generate_key


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    teams = models.ManyToManyField('Team', blank=True, related_name="teams")


# @receiver(post_save, sender=User)
# def create_profile_team(sender, instance, created, **kwargs):
#     if created:
#         team = Team.objects.create(name=instance.username + "'s team")


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
        team = Team.objects.create(name=instance.username + "'s team")
        instance.profile.teams.add(team)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()


class Team(models.Model):
    name = models.CharField(max_length=64)
    description = models.TextField(max_length=1024, null=True, blank=True)
    # owner = models.ForeignKey(User, on_delete=models.CASCADE)
    # users = models.ManyToManyField('Users', null=True, blank=True)
    nodes = models.ManyToManyField('Node', blank=True, related_name='nodes')
    unique_key = models.CharField(max_length=5,
                                  unique=True, blank=True, null=True, validators=[MinLengthValidator(5)])

    def save(self, *args, **kwargs):
        print(self.unique_key)
        if not self.unique_key:
            # Generate ID once, then check the db. If exists, keep trying.
            self.unique_key = generate_key(5)
            while Team.objects.filter(unique_key=self.unique_key).exists():
                self.unique_key = generate_key(5)
        super(Team, self).save()


# classic node model


class Node(MPTTModel):
    label = models.CharField(max_length=50, null=True, blank=True)
    value = models.CharField(
        max_length=200, unique=True, null=True, blank=True)
    parent = TreeForeignKey('self', on_delete=models.CASCADE,
                            null=True, blank=True, related_name='children')
    apiPath = models.CharField(max_length=200, blank=True, null=True)
    nodeType = models.CharField(max_length=20, blank=True, null=True)
    latLngArr = ArrayField(models.CharField(
        max_length=40), blank=True, null=True)
    # unused should be removed
    nodeReference = JSONField(blank=True, null=True)
    isDir = models.BooleanField(default=False)
    icon = models.CharField(max_length=30, blank=True, null=True)
    iconValue = models.CharField(max_length=30, blank=True, null=True)
    color = models.CharField(max_length=16, blank=True,
                             null=True, default="black")
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    description = models.CharField(
        max_length=240, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, upload_to="images/")
    # team = models.ForeignKey(
    #     Team, null=True, blank=True, on_delete=models.CASCADE, related_name="Team")

    # def __str__(self):
    #     return self.label

    class MPTTMETA:
        order_insertion_by = ['label']


class Comment(models.Model):
    node = models.ForeignKey(
        Node, on_delete=models.CASCADE, related_name='comments')
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    content = models.CharField(max_length=256, blank=False, null=False)
    created = models.DateTimeField(auto_now=True)

# @receiver(post_save, sender=Node)
# def save_team_nodes(sender, instance, **kwargs):
#     instance.teams.nodes.add(instance)
#     instance.teams.add()


register(Node)
