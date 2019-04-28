from django.apps import apps
from django.test import TestCase
from .apps import GroupsConfig

class TestAccountsConfig(TestCase):
    def test_app(self):
        self.assertEqual("groups", GroupsConfig.name)
        self.assertEqual("Groups", apps.get_app_config("groups").verbose_name)
        