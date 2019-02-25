from django import forms
from .models import UserProfileData

class CreateProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfileData
        fields = ('username', 'email')
        