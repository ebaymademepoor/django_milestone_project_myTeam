from django.test import TestCase, Client
from django.shortcuts import reverse
from django.contrib import auth, messages
from django.contrib.auth.models import User
from accounts.forms import UserRegistrationForm
from .forms import CreateGroupForm
from profile_and_stats.forms import CreateProfileForm
from django.contrib.auth import get_user_model



# Create your tests here.
class TestGroupsViews(TestCase):
    
    c=Client()
    
    def setUp(self):
        user = UserRegistrationForm({"username":"Ben", "email":"ben@ben.com", "password1":"cornbob", "password2":"cornbob"})
        this_user = user.save()
        
        profile = CreateProfileForm({"username":"Ben","email":"ben@ben.com","user":this_user.pk})
        profile.save()
        
        logged_in = self.c.login(username='Ben', password='cornbob')
        
    def test_get_group_select_page(self):    
        
        page = self.c.get("/group/group_select/")
        self.assertEqual(page.status_code, 200)
        self.assertTemplateUsed(page, "group-select.html")
        
    def test_user_can_create_new_group(self):
        
        page = self.c.post("/group/create_group/", data={"group_name":"New Group", "password":"password"}, follow=True, secure=True)
        self.assertEqual(page.status_code, 200)
        self.assertRedirects(page, expected_url=reverse('group-select'), status_code=302, target_status_code=200)
        
    def test_group_cannot_be_created_if_errors(self):
        
        page = self.c.post("/group/create_group/", data={"group_name":"","password":"password"}, follow=True, secure=True)
        self.assertEqual(page.status_code, 200)
        self.assertTemplateUsed(page, "group-select.html")

    def test_user_can_get_request_create_group(self):
        
        page = self.c.get("/group/create_group/", follow=True, secure=True)
        self.assertEqual(page.status_code, 200)
        self.assertRedirects(page, expected_url=reverse('group-select'), status_code=302, target_status_code=200)
        message = list(page.context.get('messages'))[0]
        self.assertEqual(message.tags, "error")
        self.assertEqual(message.message, "Sorry, you can't do that here!")
        
    def test_user_can_access_group_home(self):
        new_group = CreateGroupForm({'group_name':'new_group', 'password':'password', 'creator':'Ben'})
        this_group = new_group.save()
        
        this_group.users.add(1)
        this_group.save()
        
        page = self.c.get("/group/group_home/{}".format(this_group.pk), follow=True, secure=True)
        self.assertEqual(page.status_code, 200)
        self.assertTemplateUsed(page, "group-home.html")
        
    def test_user_cannot_access_group_home_if_not_a_member(self):
        new_group = CreateGroupForm({'group_name':'new_group', 'password':'password', 'creator':'Ben'})
        this_group = new_group.save()
        
        page = self.c.get("/group/group_home/{}".format(this_group.pk), follow=True, secure=True)
        self.assertEqual(page.status_code, 200)
        self.assertRedirects(page, expected_url=reverse('group-select'), status_code=302, target_status_code=200)
        message = list(page.context.get('messages'))[0]
        self.assertEqual(message.tags, "error")
        self.assertEqual(message.message, "Sneeky, but you don't appear to be a member of the group you were trying to access! Join on this page if you have the access details...")
    
    def test_user_cannot_access_page_for_group_that_doesnt_exist(self):
        page = self.c.get("/group/group_home/{}".format(2132), follow=True, secure=True)
        self.assertRedirects(page, expected_url=reverse('group-select'), status_code=302, target_status_code=200)
        message = list(page.context.get('messages'))[0]
        self.assertEqual(message.tags, "error")
        self.assertEqual(message.message, "Hmm, we can't find that group.  Is that the correct ID?!")
        
    def test_user_cannot_access_join_group_with_get(self):
        page = self.c.get("/group/join_group/", follow=True, secure=True)
        self.assertEqual(page.status_code, 200)
        self.assertRedirects(page, expected_url=reverse('group-select'), status_code=302, target_status_code=200)
        
    def test_user_cannot_join_group_that_doesnt_exist(self):
        page = self.c.post("/group/join_group/", data={"group_name":"New Group", "password":"password"}, follow=True, secure=True)
        self.assertEqual(page.status_code, 200)
        self.assertRedirects(page, expected_url=reverse('group-select'), status_code=302, target_status_code=200)
        
    def test_user_can_join_group(self):
        new_group = CreateGroupForm({'group_name':'new_group', 'password':'password', 'creator':'Ben'})
        this_group = new_group.save()
        
        page = self.c.post("/group/join_group/", data={"group_name":"New Group", "password":"password", "group_id":this_group.pk, "group_password":"password"}, follow=True, secure=True)
        self.assertEqual(page.status_code, 200)
        message = list(page.context.get('messages'))[0]
        self.assertEqual(message.tags, "success")
        self.assertEqual(message.message, "Welcome to new_group Ben!!!  Feel free to have a browse!")
        self.assertRedirects(page, expected_url=reverse('group-home', kwargs={'id': this_group.pk}), status_code=302, target_status_code=200)
    
    def test_user_cannot_join_group_with_wrong_group_password(self):
        new_group = CreateGroupForm({'group_name':'new_group', 'password':'password', 'creator':'Ben'})
        this_group = new_group.save()
        
        page = self.c.post("/group/join_group/", data={"group_name":"New Group", "password":"password", "group_id":this_group.pk, "group_password":"wrongword"}, follow=True, secure=True)
        self.assertEqual(page.status_code, 200)
        message = list(page.context.get('messages'))[0]
        self.assertEqual(message.tags, "error")
        self.assertEqual(message.message, "The password you entered for the group is incorrect. Please try again or contact the groups administrator.")
        self.assertRedirects(page, expected_url=reverse('group-select'), status_code=302, target_status_code=200)
    
    def test_user_cannot_join_group_they_are_already_a_member_of(self):
        new_group = CreateGroupForm({'group_name':'new_group', 'password':'password', 'creator':'Ben'})
        this_group = new_group.save()
        
        this_group.users.add(1)
        this_group.save()
        
        page = self.c.post("/group/join_group/", data={"group_name":"New Group", "password":"password", "group_id":this_group.pk, "group_password":"password"}, follow=True, secure=True)
        self.assertEqual(page.status_code, 200)
        message = list(page.context.get('messages'))[0]
        self.assertEqual(message.tags, "error")
        self.assertEqual(message.message, "Ben, you are already a member of new_group you crazy cat!")
        self.assertRedirects(page, expected_url=reverse('group-select'), status_code=302, target_status_code=200)
        
    def test_logged_out_user_cannot_create_new_group(self):
        self.c.logout()
        
        page = self.c.post("/group/create_group/", data={"group_name":"New Group", "password":"password"}, follow=True, secure=True)
        self.assertEqual(page.status_code, 200)
        self.assertRedirects(page, expected_url=reverse('get-started'), status_code=302, target_status_code=200)