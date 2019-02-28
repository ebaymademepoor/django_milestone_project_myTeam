from django.db import models
from django.utils import timezone

class Group(models.Model):
    creator = models.CharField(max_length=16, blank=False, null=False)
    group_name = models.CharField(max_length=16, blank=False, null=False)
    password = models.CharField(max_length=160, blank=False, null=False)
    date_created = models.DateTimeField(auto_now_add=True, blank=False)
    
    def __str__(self):
        return self.group_name
        
class GroupMember(models.Model):
    group_id = models.DecimalField(max_digits=1, decimal_places=0, null=False, blank=False)
    user_id = models.DecimalField(max_digits=1, decimal_places=0, null=False, blank=False)
    admin = models.BooleanField()
    
    def __int__(self):
        return self.group_id