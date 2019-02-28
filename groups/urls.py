from django.conf.urls import url, include
from .views import group_select

urlpatterns = [
    url(r'^group_select/', group_select, name="group-select"),
]