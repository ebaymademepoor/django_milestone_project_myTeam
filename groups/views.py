from django.shortcuts import render, redirect, reverse, get_object_or_404
from django.contrib import auth, messages
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from .forms import CreateGroupForm, JoinGroupForm
from .models import Group
from profile_and_stats.models import UserProfileData, AttributeRating
from matches.models import MatchData
from django.utils import timezone
import datetime

# Create your views here.

@login_required
def group_select(request):
    """ 
    Displays list of current users groups and option to create 
    or join new ones
    """
    
    # Query to retrieve group information
    
    my_profile = UserProfileData.objects.get(email=request.user.email)
    my_groups = my_profile.my_group.all()
    
    create_group_form = CreateGroupForm()
    join_group_form = JoinGroupForm()
    
    return render(request, 'group-select.html', {"create_group_form" : create_group_form, "join_group_form": join_group_form, "my_groups" : my_groups })
    
@login_required
def create_group(request):

    user = User.objects.get(email=request.user.email)
    users_profile_data = UserProfileData.objects.get(email=user.email)
    
    if request.method == "POST":
        
        # Create data for new group using request.post details
        
        new_group_data = {}
        new_group_data["password"] = request.POST["password"]
        new_group_data["creator"] = users_profile_data.username
        new_group_data["group_name"] = request.POST["group_name"]
        
        
        # Feed data into model form and create Group if valid
        
        create_group_form = CreateGroupForm(new_group_data)
        
        if create_group_form.is_valid():
            new_group_object = create_group_form.save()
            
            # Add this user (the creator) to the group
            
            new_group_object.users.add(users_profile_data)
            new_group_object.save()
            

            messages.success(request, "{} has been created as your new group!".format(request.POST["group_name"]))
            return redirect(reverse('group-select'))
            
        else:
            join_group_form = JoinGroupForm()
            return render(request, 'group-select.html', {"create_group_form": create_group_form, "reg_error":"yes-on-create", "join_group_form": join_group_form })
    
    messages.error(request, "Sorry, you can't do that here!") 
    return redirect(reverse('group-select'))

@login_required        
def group_home(request, id):
    this_user = UserProfileData.objects.get(username=request.user.username)
    
    try:
        this_group = Group.objects.get(pk=id)
        
    except Group.DoesNotExist:
        messages.error(request, "Hmm, we can't find that group.  Is that the correct ID?!")
        return redirect(reverse('group-select'))
    
    todays_date = datetime.datetime.now().date()
    last_weeks_date = datetime.datetime.now().date() - timezone.timedelta(days=7)
        
    groups_matches = MatchData.objects.filter(associated_group=this_group).filter(date_of_match__gte=last_weeks_date).reverse()[0:8]
    
    players_i_have_rated = AttributeRating.objects.filter(rated_by=this_user)
    
    # Ensure user is a member of the group top allow access
    
    if str(this_user.email) in str(this_group.users.all()):
        return render(request, 'group-home.html', {"group_data": this_group, "matches" : groups_matches, "players_i_have_rated" : players_i_have_rated, "this_user" : this_user })
    else:
        messages.error(request, "Sneeky, but you don't appear to be a member of the group you were trying to access! Join on this page if you have the access details...")
        return redirect(reverse('group-select'))
    
@login_required    
def join_group(request):
    """
    Allows a user to join a new group
    """
    
    if request.method == "POST":
        
        # Check to see if the group ID exists...
        try:
            
            this_group = Group.objects.get(pk=request.POST["group_id"])
            
            # If so, check to see if the group password is correct...
            
            if this_group.password == request.POST["group_password"]:
                
                this_user = UserProfileData.objects.get(username=request.user.username)
                
                if str(this_user.email) in str(this_group.users.all()):
                    # Is the user already a member?
                    
                    messages.error(request, "{0}, you are already a member of {1} you crazy cat!".format(this_user.username, this_group.group_name))
                else:
                    # If not, add the user...
                    
                    this_group.users.add(this_user)
                    this_group.save()
                    
                    # Welcome the user and display their new group page...
                    
                    messages.success(request, "Welcome to {0} {1}!!!  Feel free to have a browse!".format(this_group.group_name, this_user.username))
                    return redirect('group-home', this_group.id)
                
            else:
                
                # If the group password is wrong return an error message...
                
                messages.error(request, "The password you entered for the group is incorrect. Please try again or contact the groups administrator.")
            return redirect(reverse('group-select'))
            
        except:
            messages.error(request, "Hmm, we can't find that group.  Is that the correct ID?!")
            return redirect(reverse('group-select'))
        
    return redirect(reverse('group-select'))