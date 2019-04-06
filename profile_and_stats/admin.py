from django.contrib import admin
from .models import UserProfileData, AttributeRating

class BookAdmin(admin.ModelAdmin):
    readonly_fields = ('pk',)

class RatingsAdmin(admin.ModelAdmin):
    list_display = ('pk',  'player_rated', 'rated_by', 'last_updated',)
    readonly_fields = ('pk', 'outfield_score', 'last_updated')

# Register your models here.
admin.site.register(UserProfileData, BookAdmin)
admin.site.register(AttributeRating, RatingsAdmin)