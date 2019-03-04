from django.contrib import admin
from .models import UserProfileData

class BookAdmin(admin.ModelAdmin):
    readonly_fields = ('pk',)

# Register your models here.
admin.site.register(UserProfileData, BookAdmin)