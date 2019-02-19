from django.conf.urls import url, include
from profile_and_stats.views import user_profile

urlpatterns = [
    url(r'^profile/$', user_profile, name="profile"),
]