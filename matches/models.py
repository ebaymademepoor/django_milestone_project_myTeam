from django.db import models
from profile_and_stats.models import UserProfileData
from groups.models import Group
from django.utils import timezone

# Create your models here.
class MatchData(models.Model):
    creator = models.ForeignKey(UserProfileData, on_delete=models.SET_NULL, null=True, blank=False, related_name="creator")
    associated_group = models.ForeignKey(Group, on_delete=models.CASCADE, null=False, blank=False, related_name="linked_group")
    date_of_match = models.DateField(auto_now=False, auto_now_add=False, null=False, blank=False)
    time_of_match = models.TimeField(auto_now=False, auto_now_add=False, null=False, blank=False)
    venue = models.TextField(max_length="100", null=False, blank=False)
    players = models.ManyToManyField(UserProfileData, related_name="linked_players")
    match_notes = models.TextField(max_length="200", null=True, blank=True)
    
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
    
    class Meta:
        ordering = ('date_of_match', 'time_of_match')   
    
    def __str__(self):
        return "Match arranged by {0} for {1} on {2} with {3} - current status {4}".format(self.creator, self.time_of_match, self.date_of_match, self.associated_group, self.match_status)
        
class AvailabilityTable(models.Model):
    player = models.ForeignKey(UserProfileData, on_delete=models.CASCADE, null=False, blank=False, related_name="player_detail")
    matchID = models.ForeignKey(MatchData, on_delete=models.CASCADE, null=False, blank=False, related_name="match") 
    status = models.DecimalField(max_digits=1, decimal_places=0, default=0, null=True, blank=False)
    
    class Meta:
        ordering = ('matchID', 'status', 'player')
        
    def __str__(self):
        return "Player {0}'s status for {1} is {2}".format(self.player, self.matchID, self.status)
    