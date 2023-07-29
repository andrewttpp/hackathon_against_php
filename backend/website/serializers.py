from rest_framework import serializers

from website.models import User, Levels, Specialties, Programs


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('name', 'surname', 'patronymic', 'is_superuser', 'is_staff')


class ProgramsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Programs
        fields = ('name', )


class SpecialtiesSerializer(serializers.ModelSerializer):
    programs = ProgramsSerializer(many=True)

    class Meta:
        model = Specialties
        fields = ('code', 'name', 'programs')


class LevelsSerializer(serializers.ModelSerializer):
    specialties = SpecialtiesSerializer(many=True)

    class Meta:
        model = Levels
        fields = ('name', 'specialties')
