from django import forms
from .models import MatchData, AvailabilityTable

class CreateOrEditMatchHelperForm(forms.ModelForm):
    """
    
    """
    class Meta:
        model = MatchData
        fields = ['match_status', 'venue', 'match_notes']
    
class processMatchRequestForm(forms.ModelForm):
    
    class Meta:
        model = MatchData
        fields = ['venue', 'match_status', 'date_of_match', 'time_of_match', 'creator', 'associated_group', 'match_notes']
        
class UpdateMatchAvailabilityForm(forms.ModelForm):
    class Meta:
        model = AvailabilityTable
        fields = ['player', 'matchID', 'status', 'availability_group']
        
class SaveTeamsForm(forms.ModelForm):
    class Meta:
        model = MatchData
        fields = ['selected_team']