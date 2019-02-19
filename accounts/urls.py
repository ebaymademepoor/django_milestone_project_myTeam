from django.conf.urls import url, include
from accounts.views import index, logout, get_started, login, registration
from accounts import url_reset

urlpatterns = [
    url(r'^logout/$', logout, name="logout"),
    url(r'^get_started/$', get_started, name="get-started"),
    url(r'^login/$', login, name="login"),
    url(r'^registration/$', registration, name="register"),
    url(r'password_reset/', include(url_reset))
]