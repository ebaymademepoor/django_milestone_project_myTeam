from django.contrib import admin
from .models import MatchData, AvailabilityTable, PerformanceRating

class BookAdmin(admin.ModelAdmin):
    readonly_fields = ('pk',)
    filter_horizontal = ('players',)

class AvailBookAdmin(admin.ModelAdmin):
    readonly_fields = ('pk',)

# Register your models here.
admin.site.register(MatchData, BookAdmin)
admin.site.register(PerformanceRating, AvailBookAdmin)
admin.site.register(AvailabilityTable, AvailBookAdmin)