from django.contrib import admin
from django.contrib.auth import Group

from website.models import User


class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'surname', )


# Register your models here.
admin.site.unregister(Group)
admin.site.register(User, UserAdmin)
