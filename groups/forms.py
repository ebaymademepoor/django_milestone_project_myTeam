from django import forms
from .models import Group, GroupMember
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
                    
    password2 = forms.CharField(
                    label="Password Confirmation", 
                    widget=forms.PasswordInput)
    
    class Meta:
        model = Group
        fields = ['group_name', 'password', 'creator',]
    
    def clean_password2(self):
        password = self.cleaned_data.get('password')
        password2 = self.cleaned_data.get('password2')
        
        if not password or not password2:
            raise forms.ValidationError("Please enter your password in both fields")
            
        if password != password2:
            raise forms.ValidationError("Both passwords do not match")
            
class AddNewGroupMemberForm(forms.ModelForm):
    
    class Meta:
        model = GroupMember
        fields = ['group_id', 'user_id', 'admin']
            