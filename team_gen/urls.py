from django.conf.urls import url, include
from .views import team_gen_settings

urlpatterns = [
    url(r'^team_gen_settings/(?P<matchid>\d+)$', team_gen_settings, name="team-gen-settings"),
]