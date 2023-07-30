from rest_framework import serializers

<<<<<<< HEAD
from website.models import User, Levels, Specialties, Programs, Tests
=======
from website.models import User, Levels, Specialties, Programs
>>>>>>> a060a96cc36122fcfceed07012d418f335e2dca3


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
<<<<<<< HEAD
        fields = ('id', 'name', 'surname', 'patronymic', 'is_superuser', 'is_staff')
=======
        fields = ('name', 'surname', 'patronymic', 'is_superuser', 'is_staff')
>>>>>>> a060a96cc36122fcfceed07012d418f335e2dca3


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
<<<<<<< HEAD


class TestsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tests
        fields = ('id', 'slug', )
=======
>>>>>>> a060a96cc36122fcfceed07012d418f335e2dca3
