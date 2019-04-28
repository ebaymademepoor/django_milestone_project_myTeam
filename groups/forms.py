from django import forms
from .models import Group
from django.core.exceptions import ValidationError

class CreateGroupForm(forms.ModelForm):
    """
    Form used to create a new group for players to join
    """
    group_name = forms.CharField(label="Group Name")
    creator = forms.CharField(widget=forms.HiddenInput())
    
    
    password = forms.CharField(
                    label="Password",
                    widget=forms.PasswordInput)
    
    class Meta:
        model = Group
        fields = ['group_name', 'password', 'creator',]
        
class JoinGroupForm(forms.ModelForm):
    
    group_id = forms.DecimalField(label="Group ID", decimal_places=0, min_value=1)
    
    group_password = forms.CharField(
                    label="Password",
                    widget=forms.PasswordInput)
    
    class Meta:
        model = Group
        fields = ['group_id', 'group_password']