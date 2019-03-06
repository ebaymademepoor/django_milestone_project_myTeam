from django import forms
from .models import MatchData

class CreateOrEditMatchHelperForm(forms.ModelForm):
    """
    
    """
    class Meta:
        model = MatchData
        fields = ['venue', 'match_status']
    
class processMatchRequestForm(forms.ModelForm):
    
    class Meta:
        model = MatchData
        fields = ['venue', 'match_status', 'date_of_match', 'time_of_match', 'creator', 'associated_group',]