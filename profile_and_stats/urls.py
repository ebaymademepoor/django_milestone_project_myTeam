from django.conf.urls import url, include
from .views import user_profile

urlpatterns = [
    url(r'^user_profile/$', user_profile, name="profile"),
]