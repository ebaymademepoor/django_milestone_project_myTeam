from django.test import TestCase, Client
from django.shortcuts import reverse
from django.contrib import auth, messages
from django.contrib.auth.models import User
from accounts.forms import UserLoginForm, UserRegistrationForm

c=Client()

# Create your tests here.
class TestAccountsViews(TestCase):
    
    def test_get_home_page(self):
        page = self.client.get("/")
        self.assertEqual(page.status_code, 200)
        self.assertTemplateUsed(page, "index.html")
        
    def test_get_get_started_page(self):
        page = self.client.get("/accounts/get_started/")
        self.assertEqual(page.status_code, 200)
        self.assertTemplateUsed(page, "get_started.html")
        
    def test_logout_successfully(self):
        user = UserRegistrationForm({"username":"Ben", "email":"ben@ben.com", "password1":"cornbob", "password2":"cornbob"})
        user.save()
        
        login_successful = self.client.login(username="Ben", password="cornbob")
        self.assertTrue(login_successful)
        
        page = self.client.get("/accounts/logout/", follow=True)
        self.assertEqual(page.status_code, 200)
        self.assertRedirects(page, '/')
        message = list(page.context.get('messages'))[0]
        
        self.assertEqual(message.tags, "success")
        self.assertEqual(message.message, "You have successfully been logged out")
        
    def test_user_cannot_access_login_in_when_logged_in(self):
        user = UserRegistrationForm({"username":"Ben", "email":"ben@ben.com", "password1":"cornbob", "password2":"cornbob"})
        user.save()
        
        login_successful = self.client.login(username="Ben", password="cornbob")
        self.assertTrue(login_successful)
        
        page = self.client.get("/accounts/get_started/", follow=True)
        self.assertEqual(page.status_code, 200)
        self.assertRedirects(page, '/')
        message = list(page.context.get('messages'))[0]
        self.assertEqual(message.tags, "success")
        self.assertEqual(message.message, "Hi Ben, you are already logged in!")
        
    def test_user_cannot_request_login_if_already_logged_in(self):
        user = UserRegistrationForm({"username":"Ben", "email":"ben@ben.com", "password1":"cornbob", "password2":"cornbob"})
        user.save()
        
        login_successful = self.client.login(username="Ben", password="cornbob")
        self.assertTrue(login_successful)
        
        page = self.client.get("/accounts/login/", follow=True)
        self.assertEqual(page.status_code, 200)
        self.assertRedirects(page, '/')
        message = list(page.context.get('messages'))[0]
        self.assertEqual(message.tags, "success")
        self.assertEqual(message.message, "Hi Ben, you are already logged in!")
        
    def test_user_can_be_logged_in_successfully_with_username(self):
        user = UserRegistrationForm({"username":"Ben", "email":"ben@ben.com", "password1":"cornbob", "password2":"cornbob"})
        savedUser = user.save()
        
        page = self.client.post("/accounts/login/", data={"logInUsername":savedUser.username, "password":"cornbob"}, follow=True, secure=True)
        # self.assertEqual(page.status_code, 200)
        # message = list(page.context.get('messages'))[0]
        # self.assertEqual(message.tags, "success")
        # self.assertEqual(message.message, "Hi Ben, welcome back!")
        # self.assertRedirects(page, expected_url=reverse('profile', kwargs={'id': savedUser.pk}), status_code=302, target_status_code=200)
    
    def test_user_can_be_logged_in_successfully_with_email(self):
        user = UserRegistrationForm({"username":"Ben", "email":"ben@ben.com", "password1":"cornbob", "password2":"cornbob"})
        savedUser = user.save()
        
        page = self.client.post("/accounts/login/", data={"logInUsername":savedUser.email, "password":"cornbob"}, follow=True, secure=True)
    
    def test_user_cannot_get_request_login(self):
        user = UserRegistrationForm({"username":"Ben", "email":"ben@ben.com", "password1":"cornbob", "password2":"cornbob"})
        savedUser = user.save()
        
        page = self.client.get("/accounts/login/", follow=True)
        self.assertEqual(page.status_code, 200)
        self.assertRedirects(page, expected_url=reverse('get-started'), status_code=302, target_status_code=200)
        
    def test_user_cannot_log_in_with_bad_login_details(self):
        
        page = self.client.post("/accounts/login/", data={"logInUsername":"Ben", "password":"cornbob"}, follow=True, secure=True)
        self.assertEqual(page.status_code, 200)
        self.assertTemplateUsed(page, "get_started.html")
        # self.assertRedirects(page, expected_url=reverse('get-started'), status_code=302, target_status_code=200)
        
    def test_about_us_page(self):
        page = self.client.get("/accounts/about_us/")
        self.assertEqual(page.status_code, 200)
        self.assertTemplateUsed(page, "about_us.html")
        
    def test_contact_us_page(self):
        page = self.client.get("/accounts/contact_us/")
        self.assertEqual(page.status_code, 200)
        self.assertTemplateUsed(page, "contact_us.html")
        
    def test_cannot_accessjasmine_test_page_unless_superuser(self):
        page = self.client.get("/jasmine/")
        self.assertEqual(page.status_code, 302)
        
    def test_user_cannot_register_unless_posting_details(self):
        page = self.client.get("/accounts/registration/")
        self.assertEqual(page.status_code, 302)
        self.assertRedirects(page, expected_url=reverse('get-started'), status_code=302, target_status_code=200)
        
    def test_user_cannot_register_with_invalid_form(self):
        page = self.client.post("/accounts/registration/", data={'email':'wrong','username':"me", 'password1':"passord", 'password2':"password"}, follow=True, secure=True)
        self.assertEqual(page.status_code, 200)
        # self.assertRedirects(page, expected_url=reverse('get-started'), status_code=302, target_status_code=200)
        
    def test_user_can_register_with_invalid_form(self):
        page = self.client.post("/accounts/registration/", data={'email':'me@me.com','username':"me", 'password1':"passord", 'password2':"password"}, follow=True, secure=True)
        self.assertEqual(page.status_code, 200)