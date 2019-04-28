from django.contrib import admin
from .models import Group

class BookAdminGroup(admin.ModelAdmin):
    readonly_fields = ('id', 'pk',)
    list_display = ('group_name',)
    filter_horizontal = ('users',)

# Register your models here.
admin.site.register(Group, BookAdminGroup)
