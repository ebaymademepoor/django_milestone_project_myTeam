from django import forms
from .models import UserProfileData

class CreateProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfileData
        fields = ('username', 'email', 'user')
        
class EditProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfileData
        fields = ('first_name', 'surname', 'nickname')
        
class EditProfileDOB(forms.ModelForm):
    class Meta:
        model = UserProfileData
        fields = ('date_of_birth',)
        
class EditPositionPref(forms.ModelForm):
    class Meta:
        model = UserProfileData
        fields = ('gk_pref', 'def_pref', 'mid_pref', 'att_pref')