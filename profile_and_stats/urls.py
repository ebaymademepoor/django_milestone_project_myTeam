from django.conf.urls import url, include
from .views import user_profile, update_profile_data

urlpatterns = [
    url(r'^user_profile/', user_profile, name="profile"),
    url(r'^update_profile_data/(?P<id>\d+)$', update_profile_data, name="update_profile")
]