import jwt
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from six import text_type
from uuid import uuid4

from test_site import settings
from website.models import User, Levels, Tests
from website.serializers import UserSerializer, LevelsSerializer, TestsSerializer


class UserLoginView(APIView):
    def post(self, request):
        data = request.data
        email = data['email']
        password = data['password']

        user = User.objects.filter(email=email).first()

        if not user:
            return Response({'message': 'Account not found'}, status=status.HTTP_404_NOT_FOUND)
        elif not user.check_password(password):
            return Response({'message': 'Incorrect password'}, status=status.HTTP_404_NOT_FOUND)
        else:
            token = RefreshToken.for_user(user)
            refresh = text_type(token)
            access = text_type(token.access_token)

            data = {
                "refresh": refresh,
                "access": access
            }

            return Response({"message": "Login successfully", "data": data}, status=status.HTTP_200_OK)


class MyProfile(APIView):
    def post(self, request):
        data = request.data
        try:
            token = data['token']
            a = JWTAuthentication()
            if a.get_validated_token(token):
                user_id = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])['user_id']

                user = User.objects.filter(id=user_id).first()

                test_object = Tests.objects.filter(user_create=user)

                tests = {}

                for i in test_object:
                    tests |= TestsSerializer(i).data | {'count_questions': len(i.test)}

                return Response(data={'user': UserSerializer(user).data, 'tests': tests}, status=status.HTTP_200_OK)
            else:
                return Response({"message": "Authorization failed! Token is invalid!"},
                                status=status.HTTP_401_UNAUTHORIZED)
        except KeyError:
            return Response({"message": "Token not found"}, status=status.HTTP_404_NOT_FOUND)


class HandbookBachelor(APIView):
    def get(self, request):
        handbook = LevelsSerializer(Levels.objects.filter(name='Бакалавриат').first()).data

        return Response(data=handbook, status=status.HTTP_200_OK)


class HandbookMagistracy(APIView):
    def get(self, request):
        handbook = LevelsSerializer(Levels.objects.filter(name='Магистратура').first()).data

        return Response(data=handbook, status=status.HTTP_200_OK)


class HandbookSpecialty(APIView):
    def get(self, request):
        handbook = LevelsSerializer(Levels.objects.filter(name='Специалитет').first()).data

        return Response(data=handbook, status=status.HTTP_200_OK)


class TestCreate(APIView):
    def post(self, request):
        slug = str(uuid4())
        data = request.data
        user = User.objects.get(id=data['user_id'])
        test = data['questions']
        while True:
            if Tests.objects.filter(slug=slug):
                slug = str(uuid4())
                continue
            else:
                break
        Tests.objects.create(user_create=user, test=test, slug=slug)

        return Response({"message": "OK"}, status=status.HTTP_200_OK)


class TestsView(APIView):
    def get(self, request, slug):
        test_object = Tests.objects.filter(slug=slug).first()
        if test_object:
            test = test_object.test
            for i, elem_1 in enumerate(test):
                for k, elem_2 in enumerate(elem_1['answers']):
                    del test[i]['answers'][k]['correct']
            json_object = {'user_id': test_object.user_create.id, 'questions': test}
            return Response(data=json_object, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Test not found"}, status=status.HTTP_404_NOT_FOUND)
