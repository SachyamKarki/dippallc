from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, TestimonialViewSet, JobOpeningViewSet, contact_view

router = DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'testimonials', TestimonialViewSet)
router.register(r'jobs', JobOpeningViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('contact/', contact_view, name='contact'),
]
