from django.conf.urls import url, include
from .views import match_instance

urlpatterns = [
    url(r'^match_instance/(?P<groupid>\d+)/(?P<matchid>\d+)$', match_instance, name="matches"),
]