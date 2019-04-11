from django.contrib import admin
from .models import Subscription, Donation

# Register your models here.

class SubscriptionAdmin(admin.ModelAdmin):
    readonly_fields = ('pk',)
    
admin.site.register(Subscription, SubscriptionAdmin)
admin.site.register(Donation, SubscriptionAdmin)