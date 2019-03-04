from django.conf.urls import url, include
from .views import group_select, create_group, group_home

urlpatterns = [
    url(r'^group_select/$', group_select, name="group-select"),
    url(r'^create_group/$', create_group, name="create-group"),
    url(r'^group_home/(?P<id>\d+)$', group_home, name="group-home"),
]