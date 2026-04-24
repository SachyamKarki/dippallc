from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.mail import send_mail
from .models import Post, Testimonial
from .serializers import PostSerializer, TestimonialSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer

class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer

@api_view(['POST'])
def contact_view(request):
    name = request.data.get('name')
    email = request.data.get('email')
    message = request.data.get('message')
    
    if not name or not email or not message:
        return Response({'error': 'Name, email and message are required.'}, status=status.HTTP_400_BAD_REQUEST)
    
    # In a real app, you'd configure your SMTP settings in settings.py
    # and then send the mail here. For now we will just log it.
    print(f"Contact form submission: {name} ({email}): {message}")
    
    # send_mail(
    #     f"New Contact from {name}",
    #     message,
    #     email,
    #     ['your-recipient@example.com'],
    #     fail_silently=False,
    # )
    
    return Response({'success': 'Message received!'}, status=status.HTTP_200_OK)

