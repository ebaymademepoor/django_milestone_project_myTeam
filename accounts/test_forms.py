from django.test import TestCase
from accounts.forms import UserRegistrationForm

# Create your tests here.
class TestAccountItemForm(TestCase):
    
    def test_can_register_a_user(self):
        form = UserRegistrationForm({'email':'testuserjohn@yahoo.com', 'username': 'johnboy32', 'password1':'mypassword123', 'password2': 'mypassword123'})
        self.assertTrue(form.is_valid())
        
    def test_correct_message_for_existing_user_trying_to_register(self):
        form = UserRegistrationForm({'email':'testuserjohn@yahoo.com', 'username': 'johnboy32', 'password1':'mypassword123', 'password2': 'mypassword123'})
        form.save()
        formDuplicate = UserRegistrationForm({'email':'testuserjohn@yahoo.com', 'username': 'johnboy32', 'password1':'mypassword123', 'password2': 'mypassword123'})
        
        self.assertFalse(formDuplicate.is_valid())
        self.assertEqual(formDuplicate.errors['username'], [u'A user with that username already exists.'])
        