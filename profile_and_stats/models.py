from django.db import models

# Create your models here.
class UserProfileData(models.Model):
    user_email = models.EmailField()
    nickname = models.CharField(max_length=16)
    first_name = models.CharField(max_length=14)
    surname = models.CharField(max_length=14)
    user_photo = models.ImageField(upload_to='images')
    gk_pref = models.DecimalField(max_digits=1, decimal_places=0)
    def_pref = models.DecimalField(max_digits=1, decimal_places=0)
    mid_pref = models.DecimalField(max_digits=1, decimal_places=0)
    att_pref = models.DecimalField(max_digits=1, decimal_places=0)
    
    def __str__(self):
        return self.user_email