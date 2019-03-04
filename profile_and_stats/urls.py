from django.conf.urls import url, include
from .views import user_profile, update_profile_data, update_position_pref

urlpatterns = [
    url(r'^user_profile/(?P<id>\d+)$', user_profile, name="profile"),
    url(r'^update_profile_data/(?P<id>\d+)$', update_profile_data, name="update_profile"),
    url(r'^update_position_pref/(?P<id>\d+)$', update_position_pref, name="update_position_pref")
]