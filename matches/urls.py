from django.conf.urls import url, include
from .views import match_instance, add_or_edit_a_match

urlpatterns = [
    url(r'^match_instance/(?P<groupid>\d+)/(?P<matchid>\d+)$', match_instance, name="matches"),
    url(r'^add_or_edit_a_match/(?P<groupid>\d+)/(?P<matchid>\d+)$', add_or_edit_a_match, name="add-edit-match"),
]