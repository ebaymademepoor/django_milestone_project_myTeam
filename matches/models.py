from django.db import models
from profile_and_stats.models import UserProfileData
from groups.models import Group


# Create your models here.
class Match(models.Model):
    creator = models.ForeignKey(UserProfileData, on_delete=models.SET_NULL, null=True, blank=False)
    associated_group = models.ForeignKey(Group, on_delete=models.CASCADE, null=False, blank=False)
    date_and_time_of_match = models.DateTimeField(auto_now=False, auto_now_add=False, blank=False, null=False)
    venue = models.TextField(max_length="100")

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
    
    def __str__(self):
        return "Match arranged by {0} at {1} for group {2}".format(self.creator, self.date_and_time_of_match, self.associated_group)
