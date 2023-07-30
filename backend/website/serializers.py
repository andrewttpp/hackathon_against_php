from rest_framework import serializers

from website.models import User, Levels, Specialties, Programs, Tests


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'name', 'surname', 'patronymic', 'is_superuser', 'is_staff')


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


class TestsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tests
        fields = ('id', 'slug', )