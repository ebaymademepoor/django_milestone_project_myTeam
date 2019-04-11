from django.db import models
from profile_and_stats.models import UserProfileData

# Create your models here.

class Subscription(models.Model):
    subscribed_user = models.ForeignKey(UserProfileData)
    date_of_order = models.DateField(auto_now=False, auto_now_add=True, null=False, blank=False)
    amount_paid = models.DecimalField(max_digits=5, decimal_places=2, null=False, blank=False)
    subscription_length_in_days = models.DecimalField(max_digits=3, decimal_places=0, null=False, blank=False)
    
    def __str__(self):
        return "Subscription details: {0} - {1} - {2}".format(self.subscribed_user, self.date_of_order, self.amount_paid)
    
class Donation(models.Model):
    donated_user = models.ForeignKey(UserProfileData)
    date_of_dontation = models.DateField(auto_now=False, auto_now_add=True, null=False, blank=False)
    donation_amount_paid = models.DecimalField(max_digits=5, decimal_places=2, null=False, blank=False)
    
    def __str__(self):
        return "Donation details: {0} - {1} - {2}".format(self.donated_user, self.date_of_dontation, self.donation_amount_paid)