from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from .views import *
from test_site import settings
from django.conf.urls.static import static

urlpatterns = [
    path('login/', UserLoginView.as_view(), name='login'),
    path('user/me/', MyProfile.as_view(), name='profile_view'),
    path('handbook/bachelor/', HandbookBachelor.as_view(), name='handbook_bachelor'),
    path('handbook/magistracy/', HandbookMagistracy.as_view(), name='handbook_magistracy'),
    path('handbook/specialty/', HandbookSpecialty.as_view(), name='handbook_specialty'),
    path('test/create/', TestCreate.as_view(), name='test_create'),
    path('test/<str:slug>/', TestsView.as_view(), name='test_view'),
    path('handbook/bakalavr/', HandbookBachelor.as_view(), name='handbook_bachelor'),
    path('handbook/magistratura/', HandbookMagistracy.as_view(), name='handbook_magistracy'),
    path('handbook/specialitet/', HandbookSpecialty.as_view(), name='handbook_specialty'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL,
                                                                           document_root=settings.STATIC_ROOT)


