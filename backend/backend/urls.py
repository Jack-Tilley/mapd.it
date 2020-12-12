"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.urls import path, include
from rest_framework import routers
from api import views
from knox import views as knox_views
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r'nodes', views.NodeView, 'nodes')
router.register(r'history', views.HistoryView, 'history')
router.register(r'team_history', views.HistoryView, 'team_history')
router.register(r'allNodes', views.AllNodesView, 'allNodes')
router.register(r'teams', views.TeamsView, 'teams')
router.register(r'profiles', views.ProfilesView, 'profiles')
router.register(r'comments', views.CommentsView, 'comments')
router.register(r'basecomments', views.BaseCommentsView, 'basecomments')
router.register(r'images', views.ImagesView, 'images')
router.register(r'users', views.UserView, 'users')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/register/', views.RegisterAPI.as_view(), name='register'),
    path('api/login/', views.LoginAPI.as_view(), name='login'),
    path('api/logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('api/logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
