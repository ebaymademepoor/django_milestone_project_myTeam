from django.shortcuts import render, redirect, reverse, get_object_or_404
from django.http import HttpResponse
from django.contrib import auth, messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
import json
from .models import UserProfileData
from .forms import EditProfileForm, EditProfileDOB, EditPositionPref

def noAccessToOtherProfiles(request, yourID, requestedID):
    if int(yourID) == int(requestedID):
        return True
        

# Create your views here.
@login_required
def user_profile(request, id):
    """ Users profile page """
    
    if noAccessToOtherProfiles(request, request.user.pk, id):
        users_profile_data = get_object_or_404(UserProfileData, pk=id)
        return render(request, 'profile.html', { "profile": users_profile_data })
    else:
        messages.error(request, "We're sorry, you cannot access this page, it's not yours!")
        return redirect(reverse('index'))
    
@login_required
def update_profile_data(request, id):
    
    profile = get_object_or_404(UserProfileData, pk=id)
    
    if request.method == "POST":
        if len(request.POST) > 1:
            form = EditProfileForm(request.POST, instance=profile)
        else:
            form = EditProfileDOB(request.POST, instance=profile)
    
        response_data = {}
        
        if form.is_valid():
            form.save()
            
            response_data['result'] = 'Update successful!'
            
            
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        else:
            print(form.errors)
            return HttpResponse(json.dumps({"ERROR":"Error in updating profile"}), content_type="application/json")
    else:
        return redirect(reverse('index'))
        
@login_required
def update_position_pref(request, id):
    profile = get_object_or_404(UserProfileData, pk=id)
    
    if request.method == "POST":
        new_data = {}
        
        new_data["gk_pref"] = profile.gk_pref
        new_data["def_pref"] = profile.def_pref
        new_data["mid_pref"] = profile.mid_pref
        new_data["att_pref"] = profile.att_pref
        
        
        for key, value in request.POST.items():
            new_data[key] = value
        
        form = EditPositionPref(new_data, instance=profile)
        
        response_data = {}
        
        if form.is_valid():
            form.save()
            
            response_data['result'] = 'Update successful!'
            
            
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        else:
            print(form.errors)
            return HttpResponse(json.dumps({"ERROR":"Error in updating profile"}), content_type="application/json")
    else:
        return redirect(reverse('index'))