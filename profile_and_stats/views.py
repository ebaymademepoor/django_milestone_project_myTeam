from django.shortcuts import render, redirect, reverse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User

# Create your views here.
@login_required
def user_profile(request):
    """ Users profile page """
    
    user = User.objects.get(email=request.user.email)
    
    return render(request, 'profile.html', {"profile": user})