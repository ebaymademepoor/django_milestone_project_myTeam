from django.contrib import admin
from .models import Group, GroupMember

class BookAdminGroup(admin.ModelAdmin):
    readonly_fields = ('id', 'pk',)
    list_display = ('group_name',)
    filter_horizontal = ('users',)

class BookAdminGroupMember(admin.ModelAdmin):
    readonly_fields = ('id', 'pk',)

# Register your models here.
admin.site.register(Group, BookAdminGroup)
admin.site.register(GroupMember, BookAdminGroupMember)