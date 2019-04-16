from django.contrib import admin
from .models import Subscription, SiteDonation

# Register your models here.

class SubscriptionAdmin(admin.ModelAdmin):
    readonly_fields = ('pk', 'date_of_order')
    
class DonationAdmin(admin.ModelAdmin):
    readonly_fields = ('pk','date_of_donation')
    
admin.site.register(Subscription, SubscriptionAdmin)
admin.site.register(SiteDonation, DonationAdmin)