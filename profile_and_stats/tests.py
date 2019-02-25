from django.test import TestCase
from profile_and_stats.models import UserProfileData

# Create your tests here.
class userProfileTests(TestCase):
    """
    Tests to check our userProfile Models
    """
    
    def test_str(self):
        test_user_email = UserProfileData(email="test_user@test.com")
        self.assertEqual(str(test_user_email), "test_user@test.com")