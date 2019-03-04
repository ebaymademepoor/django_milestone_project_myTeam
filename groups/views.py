from django.shortcuts import render, redirect, reverse, get_object_or_404
from django.contrib import auth, messages
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from .forms import CreateGroupForm, AddNewGroupMemberForm, JoinGroupForm
from .models import Group, GroupMember
from profile_and_stats.models import UserProfileData

# Create your views here.

@login_required
def group_select(request):
    """ 
    Displays list of current users groups and option to create 
    or join new ones
    """
    
    # Query to retrieve group information
    
    my_profile = UserProfileData.objects.get(email=request.user.email)
    my_groups = my_profile.group_set.all()
    
    # Query to retrieve all data from a particular group
    # Carlo = Group.objects.get(group_name="Carlo")
    
    # print(Carlo.users.all())
    
    create_group_form = CreateGroupForm()
    join_group_form = JoinGroupForm()
    
    return render(request, 'group-select.html', {"create_group_form" : create_group_form, "join_group_form": join_group_form, "my_groups" : my_groups })
    
@login_required
def create_group(request):
    if request.user.is_authenticated:
        user = User.objects.get(email=request.user.email)
        users_profile_data = UserProfileData.objects.get(email=user.email)
        
        if request.method == "POST":
            
            # Create data for new group using request.post details
            
            new_group_data = {}
            new_group_data["password"] = request.POST["password"]
            new_group_data["password2"] = request.POST["password2"]
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
                if create_group_form.errors:
                    return render(request, 'group-select.html', {"create_group_form": create_group_form, "reg_error":"yes" })
                else:
                    messages.error(request, "Oh dear, something went wrong.  Please try later")
                    return render(request, 'group-select.html', {"create_group_form": create_group_form, "reg_error":"yes" })
        
    else:
        return redirect(reverse('group-select'))    
        
def group_home(request, id):
    
    # Query to retrieve all data from a particular group
    group_data = Group.objects.get(pk=id)
    
    return render(request, 'group-home.html', {"group_data": group_data })
    
def join_group(request):
    """
    Allows a user to join a new group
    """
    
    if request.method == "POST":
        
        # Check to see if the group ID exists...
        try:
            
            this_group = Group.objects.get(pk=request.POST["group_id"])
            
            if this_group.password == request.POST["password"]:
                
                # If so, check to see if the group password is correct...
                
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
                    return render(request, 'group-home.html', {"group_data": this_group })
                
            else:
                messages.error(request, "The password you entered for the group is incorrect. Please try again or contact the groups administrator.")
            return redirect(reverse('group-select'))
            
        except Group.DoesNotExist:
            messages.error(request, "Hmm, we can't find that group.  Is that the correct ID?!")
            return redirect(reverse('group-select'))
        
    return redirect(reverse('group-select'))