from django.contrib import admin
from django.contrib.auth.models import Group

from website.models import User, Groups, Levels, Specialties, Programs


class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'surname')
    fields = ('email', 'group', 'name', 'surname', 'patronymic', 'card_number')


class GroupsAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    fields = ('name', )


class LevelsAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    fields = ('name', )


class SpecialtiesAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    fields = ('level', 'code', 'name',)


class ProgramsAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    fields = ('code', 'name')


# Register your models here.
admin.site.unregister(Group)
admin.site.register(User, UserAdmin)
admin.site.register(Groups, GroupsAdmin)
admin.site.register(Levels, LevelsAdmin)
admin.site.register(Specialties, SpecialtiesAdmin)
admin.site.register(Programs, ProgramsAdmin)
