from django.test import TestCase
from groups.forms import CreateGroupForm
from django.core.exceptions import ValidationError

# Create your tests here.
class TestGroupForms(TestCase):

    def test_validation_error_raises_for_missing_password(self):
        form = CreateGroupForm({'group_name':'Football Group', 'creator':'Carlo'})
        form.is_valid()
        
        self.assertFalse(form.is_valid())


    