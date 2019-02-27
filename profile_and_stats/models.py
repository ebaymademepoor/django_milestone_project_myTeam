from django.db import models
from django.utils import timezone

def one_month_hence():
    return timezone.now() + timezone.timedelta(days=30)

# Create your models here.
class UserProfileData(models.Model):
    email = models.EmailField(null=False, blank=False)
    username = models.CharField(max_length=16, blank=True, null=False)
    nickname = models.CharField(max_length=16, blank=True)
    first_name = models.CharField(max_length=14, blank=True)
    surname = models.CharField(max_length=14, blank=True)
    user_photo = models.ImageField(upload_to='images', null=True)
    gk_pref = models.DecimalField(max_digits=1, decimal_places=0, default=0, null=False)
    def_pref = models.DecimalField(max_digits=1, decimal_places=0, default=0, null=False)
    mid_pref = models.DecimalField(max_digits=1, decimal_places=0, default=0, null=False)
    att_pref = models.DecimalField(max_digits=1, decimal_places=0, default=0, null=False)
    registration_date = models.DateTimeField(auto_now_add=True, blank=True)
    license_expiry_date = models.DateTimeField(default=one_month_hence)
    date_of_birth = models.DateField(auto_now=False, auto_now_add=False, null=True, blank=True)
    
    def __str__(self):
        return self.email