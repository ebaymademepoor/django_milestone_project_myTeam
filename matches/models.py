from django.db import models
from profile_and_stats.models import UserProfileData
from groups.models import Group
from django.utils import timezone
import datetime

# Create your models here.
class MatchData(models.Model):
    creator = models.ForeignKey(UserProfileData, on_delete=models.SET_NULL, null=True, blank=False, related_name="creator")
    associated_group = models.ForeignKey(Group, on_delete=models.CASCADE, null=False, blank=False, related_name="linked_group")
    date_of_match = models.DateField(auto_now=False, auto_now_add=False, null=False, blank=False)
    time_of_match = models.TimeField(auto_now=False, auto_now_add=False, null=False, blank=False)
    venue = models.TextField(max_length="100", null=False, blank=False)
    players = models.ManyToManyField(UserProfileData, blank=True, related_name="linked_players")
    match_notes = models.TextField(max_length="200", null=True, blank=True)
    selected_team = models.CharField(max_length = 10000, null=True, blank=True)
    reminder_emails = models.DecimalField(max_digits=1, decimal_places=0, default=0, null=True, blank=False)
    
    SCHEDULED = "S"
    CANCELLED = "C"    
    MATCH_STATUS_CHOICES = (
        (SCHEDULED, 'Scheduled'),
        (CANCELLED, 'Cancelled'),
    )
    match_status =  models.CharField(
        max_length=1,
        choices=MATCH_STATUS_CHOICES,
        default=SCHEDULED,
    )
    
    def match_completed(self):
        if datetime.datetime.combine(self.date_of_match, self.time_of_match) < datetime.datetime.now():
            return True
    
    class Meta:
        ordering = ('-date_of_match', 'time_of_match')   
    
    def __str__(self):
        return "Match arranged by {0} for {1} on {2} with {3} - current status {4}".format(self.creator, self.time_of_match, self.date_of_match, self.associated_group, self.match_status)
        
class AvailabilityTable(models.Model):
    player = models.ForeignKey(UserProfileData, on_delete=models.CASCADE, null=False, blank=False, related_name="player_detail")
    matchID = models.ForeignKey(MatchData, on_delete=models.CASCADE, null=False, blank=False, related_name="match") 
    status = models.DecimalField(max_digits=1, decimal_places=0, default=0, null=True, blank=False)
    availability_group = models.ForeignKey(Group, on_delete=models.CASCADE, null=False, blank=False, related_name="linked_availability_group")
    
    class Meta:
        ordering = ('matchID', 'status', 'player')
        
    def __str__(self):
        return "Player {0}'s status for {1} is {2}".format(self.player, self.matchID, self.status)
    
class PerformanceRating(models.Model):
    performance_player_rated = models.ForeignKey(UserProfileData, on_delete=models.CASCADE, related_name="perf_player_rated")
    performance_rated_by = models.ForeignKey(UserProfileData, on_delete=models.CASCADE)
    performance_rating = models.DecimalField(max_digits=1, decimal_places=0, default=0, null=False, blank=False)
    performance_matchID = models.ForeignKey(MatchData, on_delete=models.CASCADE, null=False, blank=False, related_name="performance_match_id")
    
    class Meta:
        ordering = ('performance_matchID',)   
    
    def __str__(self):
        return "Performance ratings for {0} - rated by {1} for match {2}, rating is {3}".format(self.performance_player_rated, self.performance_rated_by, self.performance_matchID, self.performance_rating)