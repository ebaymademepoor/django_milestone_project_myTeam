from django.db import models
from profile_and_stats.models import UserProfileData
from groups.models import Group
from django.utils import timezone

# Create your models here.
class MatchData(models.Model):
    creator = models.ForeignKey(UserProfileData, on_delete=models.SET_NULL, null=True, blank=False)
    associated_group = models.ForeignKey(Group, on_delete=models.CASCADE, null=False, blank=False)
    date_of_match = models.DateField(auto_now=False, auto_now_add=False, null=False, blank=False)
    time_of_match = models.TimeField(auto_now=False, auto_now_add=False, null=False, blank=False)
    venue = models.TextField(max_length="100", null=False, blank=False)

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