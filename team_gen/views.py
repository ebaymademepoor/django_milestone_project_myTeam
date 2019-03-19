from django.shortcuts import render, redirect, reverse, get_object_or_404
from django.contrib.auth.decorators import login_required
from groups.models import Group
from matches.models import AvailabilityTable
from django.db import connection

# Create your views here.

@login_required
def team_gen_settings(request, matchid):
    
    group_data = Group.objects.get(linked_group__pk=matchid)
    
    avail_data = AvailabilityTable.objects.filter(matchID=matchid)
    
    return render(request, 'gen_settings.html', {"avail_data" : avail_data, "group_data" : group_data})