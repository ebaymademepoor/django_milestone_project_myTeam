from django.shortcuts import render, redirect, reverse
from django.contrib import auth, messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from accounts.forms import UserLoginForm, UserRegistrationForm

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
                messages.success(request, "Hi {}, welcome back!"
                    .format(request.POST['logInUsername'].title()))
                return redirect(reverse('profile'))
            else:
                login_form.add_error(None, "Your username or password is incorrect")
                registration_form = UserRegistrationForm()
                return render(request, 'get_started.html', {"login_form": login_form, "registration_form": registration_form })
    
    return redirect(reverse('get-started'))
    
def registration(request):
    """ Register a new user """
    
    if request.method == "POST":
        registration_form = UserRegistrationForm(request.POST)
        
        if registration_form.is_valid():
            registration_form.save()
            
            user = auth.authenticate(username=request.POST['username'],
                                    password=request.POST['password1'])
                                    
            if user:
                auth.login(user=user, request=request)
                messages.success(request, "Welcome {}! You have been registered successfully".format(user.username.title()))
                return redirect(reverse('profile'))
            else:
                messages.error(request, "We're sorry, but we cannot register you at this time")
        else:
            login_form = UserLoginForm()
            return render(request, 'get_started.html', {"login_form": login_form, "registration_form": registration_form })
            
    return redirect(reverse('get-started' ))
    
def user_profile(request):
    """ Users profile page """
    
    user = User.objects.get(email=request.user.email)
    
    return render(request, 'profile.html', {"profile": user})