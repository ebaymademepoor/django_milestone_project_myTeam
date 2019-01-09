from django.shortcuts import render, redirect, reverse
from django.contrib import auth, messages
from django.contrib.auth.decorators import login_required
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
    login_form = UserLoginForm()
    registration_form = UserRegistrationForm()
    return render(request, 'get_started.html', {"login_form": login_form, "registration_form": registration_form })

def login(request):
    # Login in functionality...
    
    # Stop user accessing log in if already logged in....
    if request.user.is_authenticated:
        username = str(request.user)
        messages.success(request, "Hi {}, you are already logged in!"
            .format(username.title()))
        return redirect(reverse('index'))
    
    # Attempt to log user in...
    if request.method == "POST":
        login_form = UserLoginForm(request.POST)
        
        if login_form.is_valid():
            user = auth.authenticate(username=request.POST['username'],
                                     password=request.POST['password'])
            
            if user:
                auth.login(user=user, request=request)
                messages.success(request, "Hi {}, welcome back!"
                    .format(request.POST['username'].title()))
                return redirect(reverse('index'))
            else:
                login_form.add_error(None, "Your username or password is incorrect")
    else:
        login_form = UserLoginForm()
    
    return render(request, 'get_started.html', {"login_form": login_form })
    
def registration(request):
    """ Register a new user """
    
    registration_form = UserRegistrationForm()
    
    return redirect(reverse('index'))