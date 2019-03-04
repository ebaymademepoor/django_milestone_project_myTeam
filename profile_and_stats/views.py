from django.shortcuts import render, redirect, reverse, get_object_or_404
from django.http import HttpResponse
from django.contrib import auth, messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .models import UserProfileData
from groups.models import Group
import json
from .forms import EditProfileForm, EditProfileDOB, EditPositionPref
import datetime

def noAccessToOtherProfiles(request, yourID, requestedID):
    if int(yourID) == int(requestedID):
        return True

def age(bday, d=None):
    if d is None:
        d = datetime.date.today()
    return (d.year - bday.year) - int((d.month, d.day) < (bday.month, bday.day))     

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
        if request.user.pk == id:
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
             return HttpResponse(json.dumps({"ERROR":"Error in updating profile - unauth user"}), content_type="application/json")
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
        
def player_profile(request, playerid, groupid):
    
    # Check that the group and player exist...
    
    try:
        common_group = Group.objects.get(pk=groupid)
        player = UserProfileData.objects.get(pk=playerid)
    except:
        messages.error(request, "Sorry but we can't find what you are looking for!")
        return redirect(reverse('group-select'))
    
    # IF YES... Security check - are the user and the selected player in the same group?
    
    if str(player.email) in str(common_group.users.all()) and str(request.user.email) in str(common_group.users.all()):
        
        #  If so, the page can be view and ratings can occur...
        
        try:
            my_age = age(player.date_of_birth)
        except:
            my_age = "Not provided"
    
        return render(request, 'player-profile.html', { "player" : player, "age" : my_age })
    else:
        messages.error(request, "Sorry but you are not linked to this player and cannot view their profile")
        return redirect(reverse('group-select'))