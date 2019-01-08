from django.shortcuts import render, redirect, reverse
from django.contrib import auth, messages
from accounts.forms import UserLoginForm

def index(request):
    """
    Returns the index.html files
    """
    return render(request, 'index.html')
    
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
    
    if request.method == "POST":
        login_form = UserLoginForm(request.POST)
        
        if login_form.is_valid():
            user = auth.authenticate(username=request.POST['username'],
                                     password=request.POST['password'])
            
            if user:
                auth.login(user=user, request=request)
                messages.success(request, "Hi {}, welcome back!".format(request.POST['username']))
            else:
                login_form.add_error(None, "Your username or password is incorrect")
    else:
        login_form = UserLoginForm()
    
    return render(request, 'get_started.html', {"login_form": login_form })