import datetime
import re
from django.http import HttpResponse
from django.shortcuts import render, redirect, reverse, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import auth, messages
from .forms import CreateOrEditMatchHelperForm, processMatchRequestForm, UpdateMatchAvailabilityForm
from groups.models import Group
from .models import MatchData, AvailabilityTable
from profile_and_stats.models import UserProfileData
from django.utils import timezone, six
from django.utils.dateparse import parse_date
from django.utils.timezone import get_fixed_timezone, utc
from django.db import connection
import json

# Create your views here.
@login_required
def match_instance(request, groupid, matchid):
    
    my_profile = UserProfileData.objects.get(email=request.user.email)
    
    if int(matchid) == 0:
        
        match_form = CreateOrEditMatchHelperForm()
        this_match = None
        avail_data = None
    else:
        this_match = get_object_or_404(MatchData, pk=matchid)
        match_form = CreateOrEditMatchHelperForm(instance=this_match)
        try:
            avail_data = AvailabilityTable.objects.filter(matchID=matchid)
        except:
            avail_data = None    
    
    return render(request, 'match_page.html', { "match_form": match_form, "groupid" : groupid, "matchid": matchid, "match_data": this_match, "avail_data":avail_data, "this_user" : my_profile })

@login_required    
def add_or_edit_a_match(request, groupid, matchid):
    
    if request.method == "POST":
        
        try:
            this_group = Group.objects.get(pk=groupid)
        except:
            messages.error(request, "We can't find the group you're looking for...")
            return redirect(reverse('group-select'))    
        
        if this_group:
            
            # Security check - is the user posting for a group they are a member of?
            
            if str(request.user.email) in str(this_group.users.all()):
                
                # If so process their request...
                
                if int(matchid) != 0:
                    this_match = get_object_or_404(MatchData, pk=matchid)
                else:
                    this_match = None
                
                
                # Create the data using info provided from the form...
                
                match_data ={}
                
                for key, value in request.POST.items():
                    match_data[key] = value
                
                match_data["creator"] = UserProfileData.objects.get(pk=request.user.pk)
                match_data["associated_group"] = this_group.pk
                
                match_data_form = processMatchRequestForm(match_data, instance=this_match)
                
                # Save the first booking...
                
                if match_data_form.is_valid():
                    match = match_data_form.save()
                    
                    # Check to see if the user requested a repeat booking...
                    
                    try:
                        repeats = int(match_data["repeat"])
                    except:
                        repeats = 0
                    
                    if int(repeats) > 0:
                        
                        # If repeats then book in a match for each requested repeat instance...
                        
                        match_booking = 1
                        while repeats > match_booking:
                            d = parse_date(str(match_data["date_of_match"]))
                            d += timezone.timedelta(days=7)
                            match_data["date_of_match"] = d
                            match_booking += 1
                            match_data_form = processMatchRequestForm(match_data, instance=this_match)
                            if match_data_form.is_valid():
                                match = match_data_form.save()
                    
                    if match.match_status == "S":
                        messages.success(request, "Match arranged for {0} on {1}".format(match_data["time_of_match"], match_data["date_of_match"]))
                    else:
                        messages.success(request, "Match at {0} on {1} is marked as cancelled".format(match_data["time_of_match"], match_data["date_of_match"]))
                else:
                    print(match_data_form.errors)
                    messages.error(request, "Something went wrong")
                    return redirect(reverse('group-select'))  
                
        else:
            messages.error(request, "You can't do that here")
            return redirect(reverse('group-select'))    
    
    return redirect(reverse('group-home', kwargs={"id" : groupid}))
    
@login_required
def update_availability_status(request, matchid, availability_table_id):
    """ 
    Allows user to make themselves available or unavailable for a match by
    creating an instance for that match that confirms their availability
    """
    if request.method == "POST":
        
        # Edit or create an instance by checking if one is already available
        
        try:
            availability = AvailabilityTable.objects.get(pk=availability_table_id)
        except:
            availability = None
        
        group = Group.objects.get(linked_group__pk=matchid)
        
        # Prepare the data received via js ajax
        
        new_data = {}
        new_data["player"] = request.user.pk
        new_data["matchID"] = request.POST["matchID"]
        new_data["status"] = request.POST["status"]
        new_data["availability_group"] = group.pk
        
        """ Security check to make sure data is all related, is user in 
        associated group? """
        
        if str(request.user.email) in str(group.users.all()):
        
            form = UpdateMatchAvailabilityForm(new_data, instance=availability)
            
            response_data = {}
            
            if form.is_valid():
                new_record = form.save()
                
                response_data['result'] = 'Update successful!'
                response_data['instanceID'] = new_record.pk
                
                
                return HttpResponse(json.dumps(response_data),content_type="application/json")
            else:
                print(form.errors)
                return HttpResponse(json.dumps({"ERROR":"Error in updating availability"}), content_type="application/json")
        else:
            return HttpResponse(json.dumps({"ERROR":"You are not a member of this group!"}), content_type="application/json")
    else:
        return redirect(reverse('index'))