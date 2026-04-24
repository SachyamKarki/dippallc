from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, TestimonialViewSet, contact_view

router = DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'testimonials', TestimonialViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('contact/', contact_view, name='contact'),
]
