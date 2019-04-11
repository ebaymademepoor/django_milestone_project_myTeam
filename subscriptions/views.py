from django.shortcuts import render, redirect, reverse
from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.utils import timezone
from django.contrib import messages
from .forms import TakeAPaymentForm, UpdateSubscriptionDateForm, CreateASubscriptionRecordForm, CreateADonationRecordForm
from profile_and_stats.models import UserProfileData
import stripe

# Create your views here.

stripe.api_key = settings.STRIPE_SECRET

@login_required()
def checkout(request, type):
    if request.method == "POST":
        payment_form = TakeAPaymentForm(request.POST)
        
        this_user = UserProfileData.objects.get(username=request.user.username)
        
        if payment_form.is_valid():
            
            if type == "D":
                form = CreateADonationRecordForm({"donated_user" : this_user, "donation_amount_paid" : request.POST["donation_value"]})
                value = request.POST["donation_value"]
                
                if form.is_valid():
                    donation = form.save()
                else:
                    "Error message here"
            
            elif type == "S":
                # 6 months subscription
                subscription_length = 183 
                value = 1.99
                
                form = CreateASubscriptionRecordForm({ "subscribed_user" : this_user, "amount_paid" : value, "subscription_length_in_days" : subscription_length })
                
                if form.is_valid():
                    subscription = form.save()
                    
                    new_date = timezone.now() + timezone.timedelta(days=subscription_length)
                    
                    update_expiry_form = UpdateSubscriptionDateForm({"license_expiry_date" : new_date }, instance=this_user)
                    
                    if update_expiry_form.is_valid():
                        update_expiry_form.save()
                    
                else:
                    "Error message here"
                
                
            try:
                customer = stripe.Charge.create(
                    amount = int(value * 100),
                    currency = "GBP",
                    description = request.user.email,
                    card = payment_form.cleaned_data['stripe_id'],
                )
            except stripe.error.CardError:
                messages.error(request, "Unfortunately your card has been declined.")
                
            if customer.paid:
                messages.success(request, "Thank you for your payment!")
                return redirect(reverse('group-select'))
            else:
                messages.error(request, "Unfortunately your card has been declined and we were unable to take payment.")
                form = TakeAPaymentForm()
                
        else:
            form = TakeAPaymentForm()
            print(payment_form.errors)
            messages.error(request, "Issue")
    else:
        form = TakeAPaymentForm()
        
    return render(request, "checkout.html", {"form": form, "publishable" : settings.STRIPE_PUBLISHABLE, "type" : type })