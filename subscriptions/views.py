import stripe
from django.shortcuts import render, redirect, reverse
from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.utils import timezone
from django.contrib import messages
from .forms import TakeAPaymentForm, UpdateSubscriptionDateForm, CreateASubscriptionRecordForm, CreateADonationRecordForm
from profile_and_stats.models import UserProfileData

# Create your views here.

stripe.api_key = settings.STRIPE_SECRET_KEY

@login_required()
def checkout(request, type):
    if request.method == "POST":
        payment_form = TakeAPaymentForm(request.POST)
        print(request.POST)
        this_user = UserProfileData.objects.get(username=request.user.username)
        
        if payment_form.is_valid():
            
            if type == "D":
                form = CreateADonationRecordForm({"donated_user" : this_user, "donation_amount_paid" : request.POST["donation_value"]})
                value = int(request.POST["donation_value"])
                
                if form.is_valid():
                    record = form.save(commit=False)
                else:
                    print("Error message here")
            
            elif type == "S":
                # 6 months subscription
                subscription_length = 183 
                value = 1.99
                
                form = CreateASubscriptionRecordForm({ "subscribed_user" : this_user, "amount_paid" : value, "subscription_length_in_days" : subscription_length })
                
                if form.is_valid():
                    record = form.save(commit=False)
                    
                    new_date = timezone.now() + timezone.timedelta(days=subscription_length)
                    
                    update_expiry_form = UpdateSubscriptionDateForm({"license_expiry_date" : new_date }, instance=this_user)
                    
                    if update_expiry_form.is_valid():
                        update_expiry_form.save()
                    
                else:
                    print("Error message here")
                
            print(payment_form.cleaned_data['stripe_id'])
            print(value)
                
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
                messages.success(request, "Thank you so much for your payment!  Keep using my team and we'll keep improving it!")
                record.status = "success"
                record.save()
                return redirect(reverse('profile', kwargs={"id" : this_user.pk}))
            else:
                messages.error(request, "Unfortunately your card has been declined and we were unable to take payment.")
                record.status = "failed"
                record.save()
                form = TakeAPaymentForm()
                
        else:
            form = TakeAPaymentForm()
            print(payment_form.errors)
            messages.error(request, "There was something wrong with your payment form.  Please try again.")
            
    else:
        form = TakeAPaymentForm()
        
        
    return render(request, "checkout.html", {"form": form, "publishable" : settings.STRIPE_PUBLISHABLE_KEY, "type" : type })