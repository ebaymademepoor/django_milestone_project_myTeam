from django.db import models
from django.utils import timezone
from profile_and_stats.models import UserProfileData

class Group(models.Model):
    creator = models.CharField(max_length=16, blank=False, null=False)
    group_name = models.CharField(max_length=26, blank=False, null=False)
    password = models.CharField(max_length=160, blank=False, null=False)
    date_created = models.DateTimeField(auto_now_add=True, blank=False)
    users = models.ManyToManyField(UserProfileData, related_name="my_group")
    
    def next_match(self):
        return self.linked_group.filter(date_of_match__gte=timezone.now()).order_by('date_of_match')[0:1]
    
    class Meta:
        ordering = ('date_created',)
    
    def __str__(self):
        return self.group_name
 
# May use the below at a later date to manage group admin rights... 
        
# class GroupMember(models.Model):
#     group_id = models.DecimalField(max_digits=1, decimal_places=0, null=False, blank=False)
#     user_id = models.ManyToManyField(Group)
#     profiles = models.ManyToManyField(UserProfileData)
#     admin = models.BooleanField()
    
#     class Meta:
#         ordering = ('group_id',)    
        
#     def __str__(self):
#         return self.group_id