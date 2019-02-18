from django.test import TestCase
from django.shortcuts import reverse

# Create your tests here.
class TestViews(TestCase):
    
    def test_get_home_page(self):
        page = self.client.get("/")
        self.assertEqual(page.status_code, 200)
        self.assertTemplateUsed(page, "index.html")
        
    def test_get_get_started_page(self):
        page = self.client.get("/accounts/get_started/")
        self.assertEqual(page.status_code, 200)
        self.assertTemplateUsed(page, "get_started.html")
        
    def test_logout_successfully(self):
        page = self.client.get("/accounts/logout/")
        self.assertEqual(page.status_code, 302)
        