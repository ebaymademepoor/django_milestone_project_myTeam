from django.shortcuts import render, redirect, reverse
from django.contrib import auth, messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from accounts.forms import UserLoginForm, UserRegistrationForm
from profile_and_stats.forms import CreateProfileForm
from django.core.mail import send_mail

def index(request):
    """
    Returns the index.html files
    """
    return render(request, 'index.html')

@login_required
def logout(request):
    """
    Logs the user out
    """
    auth.logout(request)
    messages.success(request, "You have successfully been logged out")
    return redirect(reverse('index'))

def get_started(request):
    
    """
    Return page that will allow existing users to log in or new users to create an account
    """
    
    # Stop user accessing page if already logged in....
    if request.user.is_authenticated:
        username = str(request.user)
        messages.success(request, "Hi {}, you are already logged in!"
            .format(username.title()))
        return redirect(reverse('index'))
    
    login_form = UserLoginForm()
    
    registration_form = UserRegistrationForm()
        
    return render(request, 'get_started.html', {"login_form": login_form, "registration_form": registration_form })

def login(request):
    # Stop user accessing page if already logged in....
    if request.user.is_authenticated:
        username = str(request.user)
        messages.success(request, "Hi {}, you are already logged in!"
            .format(username.title()))
        return redirect(reverse('index'))
        
    # Login in functionality...    
        
    # Attempt to log user in...
    if request.method == "POST":
        
        login_form = UserLoginForm(request.POST)
        
        if login_form.is_valid():
            user = auth.authenticate(username=request.POST['logInUsername'],
                                     password=request.POST['password'])
            if user:
                auth.login(user=user, request=request)
                
                if "@" in request.POST['logInUsername']:
                    str_username = request.POST['logInUsername']
                else: 
                    str_username = request.POST['logInUsername'].title()
                    
                messages.success(request, "Hi {}, welcome back!".format(str_username))
                return redirect(reverse('profile'))
            else:
                login_form.add_error(None, "Your username or password is incorrect")
                registration_form = UserRegistrationForm()
                return render(request, 'get_started.html', {"login_form": login_form, "registration_form": registration_form, "login_error":"yes" })
    
    return redirect(reverse('get-started'))
    
def registration(request):
    """ 
    Register a new user and create the basis of their user profile
    """
    
    if request.method == "POST":
        registration_form = UserRegistrationForm(request.POST)
        new_profile_form = CreateProfileForm(request.POST)
        
        if registration_form.is_valid():
            registration_form.save()
            
            user = auth.authenticate(username=request.POST['username'],
                                    password=request.POST['password1'])
                                    
            if new_profile_form.is_valid():
                new_profile_form.save()
                                    
            if user:
                auth.login(user=user, request=request)
                messages.success(request, "Welcome {}! You have been registered successfully".format(user.username.title()))
                send_mail('Thanks for registering with myTeam!', 
                    'Hi {0},\n\nThanks for registering with us, your personal playing career just got a whole lot better!\nWe just thought we would let you know that your username is {1}, please keep this email safe!\n\nWe wish you all the best in your playing career!'.format(request.POST['email'],request.POST['username']),
                    'The myTeam Peeps', [request.POST["email"]],fail_silently=False,)
                return redirect(reverse('profile'))
            else:
                messages.error(request, "We're sorry, but we cannot register you at this time")
                
        else:
            login_form = UserLoginForm()
            return render(request, 'get_started.html', {"login_form": login_form, "registration_form": registration_form, "reg_error":"yes" })
            
    return redirect(reverse('get-started' ))