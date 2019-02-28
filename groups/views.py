from django.shortcuts import render, redirect, reverse, get_object_or_404
from django.contrib import auth, messages
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.hashers import make_password
from .forms import CreateGroupForm, AddNewGroupMemberForm
from .models import Group

# Create your views here.

@login_required
def group_select(request):
    """ 
    Displays list of current users groups and option to create 
    or join new ones
    """
    
    create_group_form = CreateGroupForm()
    
    
    return render(request, 'group_select.html', {"create_group_form" : create_group_form})
    
@login_required
def create_group(request):
    if request.user.is_authenticated:
        username = str(request.user)
        user=request.user
        
        if request.method == "POST":
            
            print(request.POST)
            new_group_data = {}
            new_group_data["password"] = request.POST["password"]
            new_group_data["password2"] = request.POST["password2"]
            new_group_data["creator"] = username
            new_group_data["group_name"] = request.POST["group_name"]
            
            create_group_form = CreateGroupForm(new_group_data)
            
            if create_group_form.is_valid():
                create_group_form.save()
                
                existing_groups = Group.objects.all()
                no_of_groups = existing_groups.count()
                
                new_group_member_details = {}
                new_group_member_details["group_id"] = no_of_groups
                new_group_member_details["user_id"] = user.pk
                new_group_member_details["admin"] = True
                
                new_group_member_form = AddNewGroupMemberForm(new_group_member_details)
                
                if new_group_member_form.is_valid():
                    new_group_member_form.save()
                
                messages.success(request, "{} has been created as your new group!".format(request.POST["group_name"]))
                return redirect(reverse('group-select'))
                
            else:
                if create_group_form.errors:
                    return render(request, 'group_select.html', {"create_group_form": create_group_form, "reg_error":"yes" })
                else:
                    messages.error(request, "Oh dear, something went wrong.  Please try later")
                    return render(request, 'group_select.html', {"create_group_form": create_group_form, "reg_error":"yes" })
        
    else:
        return redirect(reverse('group-select'))    