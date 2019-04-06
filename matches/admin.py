from django.contrib import admin
from .models import MatchData, AvailabilityTable, PerformanceRating

class BookAdmin(admin.ModelAdmin):
    readonly_fields = ('pk',)
    filter_horizontal = ('players',)

class AvailBookAdmin(admin.ModelAdmin):
    readonly_fields = ('pk',)

class PerformanceRatingAdmin(admin.ModelAdmin):
    list_display = ('pk', 'performance_player_rated', 'performance_rated_by',
        'performance_matchID', 'performance_rating')
    
    
# Register your models here.
admin.site.register(MatchData, BookAdmin)
admin.site.register(PerformanceRating, PerformanceRatingAdmin)
admin.site.register(AvailabilityTable, AvailBookAdmin)