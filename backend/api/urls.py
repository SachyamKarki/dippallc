from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter

from .views import (
    PostViewSet,
    TestimonialViewSet,
    JobOpeningViewSet,
    ContactSubmissionViewSet,
    contact_view,
)

router = DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'testimonials', TestimonialViewSet)
router.register(r'jobs', JobOpeningViewSet, basename='jobopenings')
router.register(r'contact-submissions', ContactSubmissionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('contact/', contact_view, name='contact'),
    path('auth/login/', obtain_auth_token, name='auth-login'),
]
