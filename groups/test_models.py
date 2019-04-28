from django.test import TestCase
from .models import Group

# Create your tests here.
class TestGroupModel(TestCase):
    def test_group_is_a_string(self):
        group = Group(group_name="Football Group")
        self.assertEqual("Football Group", str(group))