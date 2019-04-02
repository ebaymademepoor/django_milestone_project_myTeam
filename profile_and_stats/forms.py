from django import forms
from .models import UserProfileData, AttributeRating

class CreateProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfileData
        fields = ('username', 'email', 'user')
        
class EditProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfileData
        fields = ('first_name', 'surname', 'nickname')
        
class AddImageForm(forms.Form):
        image = forms.ImageField(label="")
        
class EditProfileDOB(forms.ModelForm):
    class Meta:
        model = UserProfileData
        fields = ('date_of_birth',)
        
class EditPositionPref(forms.ModelForm):
    class Meta:
        model = UserProfileData
        fields = ('gk_pref', 'def_pref', 'mid_pref', 'att_pref')
        
class RatePlayerForm(forms.ModelForm):
    class Meta:
        model = AttributeRating
        fields = ('gk_score', 'def_score', 'passing_score', 'finishing_score', 'movement_score', 'rated_by', 'player_rated')