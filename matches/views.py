from django.shortcuts import render, redirect, reverse, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User

# Create your views here.
@login_required
def match_instance(request, groupid, matchid):
    
    
    
    return render(request, 'match_page.html', {  })