from django.shortcuts import render, redirect, reverse, get_object_or_404
from django.contrib.auth.decorators import login_required
from groups.models import Group
from matches.models import AvailabilityTable, MatchData
from profile_and_stats.models import AttributeRating
from django.db.models import Avg
from django.db import connection

# Create your views here.

@login_required
def team_gen_settings(request, matchid):
    
    match_data = MatchData.objects.get(pk=matchid)
    group_data = Group.objects.get(linked_group__pk=matchid)
    avail_data = AvailabilityTable.objects.filter(matchID=matchid)
    rating_data = AttributeRating.objects.filter(
        player_rated__my_group__pk=group_data.pk).values(
            'player_rated').annotate(
                avg_gk=Avg('gk_score'), 
                avg_def=Avg('def_score'), 
                avg_move=Avg('movement_score'), 
                avg_pass=Avg('passing_score'),
                avg_fin=Avg('finishing_score'),
                avg_out=(Avg('def_score')+Avg('movement_score')+Avg('passing_score')+Avg('finishing_score'))/4 )
    
    return render(request, 'gen_settings.html', {"avail_data" : avail_data, "group_data" : group_data, "rating_data": rating_data, "match_data": match_data})