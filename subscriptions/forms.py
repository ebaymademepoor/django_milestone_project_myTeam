from django import forms
from .models import Subscription, SiteDonation
from profile_and_stats.models import UserProfileData

class TakeAPaymentForm(forms.Form):
    
    MONTH_CHOICES = [(i,i) for i in range(1,13)]
    YEAR_CHOICES = [(i,i) for i in range(2019,2036)]
    
    credit_card_number = forms.CharField(label="Credit Card Number", required = False)
    cvv = forms.CharField(label="CVV", required=False)
    expiry_month = forms.ChoiceField(label="Month", choices=MONTH_CHOICES, required=False)
    expiry_year = forms.ChoiceField(label="Year", choices=YEAR_CHOICES, required=False)
    stripe_id = forms.CharField(widget=forms.HiddenInput)
    
class UpdateSubscriptionDateForm(forms.ModelForm):
    class Meta:
        model = UserProfileData
        fields = ("license_expiry_date", )
        
class CreateASubscriptionRecordForm(forms.ModelForm):
    class Meta:
        model = Subscription
        fields = ("subscribed_user", "amount_paid", "subscription_length_in_days")
    
class CreateADonationRecordForm(forms.ModelForm):
    class Meta:
        model = SiteDonation
        fields = ("donated_user", "donation_amount_paid")