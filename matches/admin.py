from django.contrib import admin
from .models import MatchData

class BookAdmin(admin.ModelAdmin):
    readonly_fields = ('pk',)

# Register your models here.
admin.site.register(MatchData, BookAdmin)