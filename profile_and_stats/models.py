from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from helpers import rotate_image

import os
import sys
from PIL import Image
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.db.models.signals import post_save
from django.dispatch import receiver


def one_month_hence():
    return timezone.now() + timezone.timedelta(days=30)

# Create your models here.
class UserProfileData(models.Model):
    email = models.EmailField(null=False, blank=False)
    username = models.CharField(max_length=16, blank=True, null=False)
    nickname = models.CharField(max_length=16, blank=True)
    first_name = models.CharField(max_length=14, blank=True)
    surname = models.CharField(max_length=14, blank=True)
    user_photo = models.ImageField(upload_to='images', null=True, blank=True)
    gk_pref = models.DecimalField(max_digits=1, decimal_places=0, default=0, null=False)
    def_pref = models.DecimalField(max_digits=1, decimal_places=0, default=0, null=False)
    mid_pref = models.DecimalField(max_digits=1, decimal_places=0, default=0, null=False)
    att_pref = models.DecimalField(max_digits=1, decimal_places=0, default=0, null=False)
    registration_date = models.DateTimeField(auto_now_add=True, blank=True)
    license_expiry_date = models.DateTimeField(default=one_month_hence)
    date_of_birth = models.DateField(auto_now=False, auto_now_add=False, null=True, blank=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True,)
    
    def has_current_license(self):
        if self.license_expiry_date > timezone.now():
            return True
    
    class Meta:
        ordering = ('username',)
    
    
    def save(self):
        # Opening the uploaded image
        im = Image.open(self.user_photo)

        output = BytesIO()

        # Resize/modify the image
        # im = im.resize((100, 100))

        # after modifications, save it to the output
        im.save(output, format='JPEG', quality=30)
        output.seek(0)

        # change the imagefield value to be the newley modifed image value
        self.user_photo = InMemoryUploadedFile(output, 'ImageField', "%s.jpg" % self.user_photo.name.split('.')[0], 'image/jpeg',
                                        sys.getsizeof(output), None)

        super(UserProfileData, self).save()
        
    def __str__(self):
        return self.email

@receiver(post_save, sender=UserProfileData, dispatch_uid="update_image_profile")
def update_image(sender, instance, **kwargs):
  if instance.user_photo:
    fullpath = instance.user_photo
    rotate_image(fullpath)
        
class AttributeRating(models.Model):
    player_rated = models.ForeignKey(UserProfileData, on_delete=models.CASCADE, related_name="player_rated")
    rated_by = models.ForeignKey(UserProfileData, on_delete=models.CASCADE, related_name="rated_by")
    gk_score = models.DecimalField(max_digits=2, decimal_places=0, default=0, null=False, blank=False)
    def_score = models.DecimalField(max_digits=2, decimal_places=0, default=0, null=False, blank=False)
    passing_score = models.DecimalField(max_digits=2, decimal_places=0, default=0, null=False, blank=False)
    finishing_score = models.DecimalField(max_digits=2, decimal_places=0, default=0, null=False, blank=False)
    movement_score = models.DecimalField(max_digits=2, decimal_places=0, default=0, null=False, blank=False)
    
    def outfield_score(self):
        scores = [self.def_score, self.passing_score, self.finishing_score, self.movement_score]
        len_scores = len(scores)
        total_scores = sum(scores)
        
        return total_scores / len_scores
        
    def __str__(self):
        return "Ratings for {0} - rated by {1}".format(self.player_rated, self.rated_by)