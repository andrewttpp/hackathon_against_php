import jwt
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from six import text_type

from test_site import settings
from website.models import User, Levels
from website.serializers import UserSerializer, LevelsSerializer


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
        token = data['token']
        a = JWTAuthentication()
        if a.get_validated_token(token):
            user_id = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])['user_id']

            user = User.objects.filter(id=user_id).first()

            return Response(data=UserSerializer(user).data, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Authorization failed! Token is invalid!"}, status=status.HTTP_401_UNAUTHORIZED)


class HandbookBachelor(APIView):
    def get(self, request):
        handbook = LevelsSerializer(Levels.objects.filter(name='Бакалавр').first()).data

        return Response(data=handbook, status=status.HTTP_200_OK)


class HandbookMagistracy(APIView):
    def get(self, request):
        handbook = LevelsSerializer(Levels.objects.filter(name='Магистратура').first()).data

        return Response(data=handbook, status=status.HTTP_200_OK)


class HandbookSpecialty(APIView):
    def get(self, request):
        handbook = LevelsSerializer(Levels.objects.filter(name='Специалитет').first()).data

        return Response(data=handbook, status=status.HTTP_200_OK)
