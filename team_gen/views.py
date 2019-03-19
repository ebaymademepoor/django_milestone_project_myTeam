from django.shortcuts import render, redirect, reverse, get_object_or_404
from django.contrib.auth.decorators import login_required
from matches.models import MatchData, AvailabilityTable
from django.db import connection

# Create your views here.

@login_required
def team_gen_settings(request, matchid):
    
    avail_data = AvailabilityTable.objects.get(matchID=matchid)
    
    return render(request, 'gen_settings.html', {"avail_data" : avail_data})