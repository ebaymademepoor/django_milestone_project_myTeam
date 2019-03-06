from django.shortcuts import render, redirect, reverse, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import auth, messages
from .forms import CreateOrEditMatchHelperForm, processMatchRequestForm
from groups.models import Group
from .models import MatchData
from profile_and_stats.models import UserProfileData

# Create your views here.
@login_required
def match_instance(request, groupid, matchid):
    
    match_form = CreateOrEditMatchHelperForm()
    
    return render(request, 'match_page.html', { "match_form": match_form, "groupid" : groupid, "matchid": matchid })

@login_required    
def add_or_edit_a_match(request, groupid, matchid):
    
    print(groupid)
    if request.method == "POST":
        
        try:
            this_group = Group.objects.get(pk=groupid)
            print("Group found")
            # Security check - is the user posting for a group they are a member of?
        except:
            messages.error(request, "We can't find the group you're looking for...")
            return redirect(reverse('group-select'))    
        
        if this_group:
            
            if str(request.user.email) in str(this_group.users.all()):
                
                # If so process their request...
                
                match_data = {}
                
                for key, value in request.POST.items():
                    match_data[key] = value
                
                match_data["creator"] = UserProfileData.objects.get(pk=request.user.pk)
                match_data["associated_group"] = this_group.pk
                
                match_data_form = processMatchRequestForm(match_data)
                
                if match_data_form.is_valid():
                    match_data_form.save()
                    messages.success(request, "Match arranged for {0} on {1}".format(match_data["time_of_match"], match_data["date_of_match"]))
                else:
                    print(match_data_form.errors)
                    messages.error(request, "Something went wrong")
                    return redirect(reverse('group-select'))    
                
        else:
            messages.error(request, "You can't do that here")
            return redirect(reverse('group-select'))    
    
    return redirect(reverse('group-home', kwargs={"id" : groupid}))
    