from django import forms 

class UserLoginForm(forms.Form):
    """
    Form to be used to log exisitng users in
    """
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)