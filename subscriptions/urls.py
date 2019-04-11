from django.conf.urls import url
from .views import checkout

urlpatterns = [
    url(r'^(?P<type>[\w\-]+)$', checkout, name="checkout"),
    ]