from django.conf import settings
from django.core.mail import send_mail
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .models import Post, Testimonial, JobOpening, ContactSubmission
from .serializers import (
    PostSerializer,
    TestimonialSerializer,
    JobOpeningSerializer,
    ContactSubmissionSerializer,
)


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer


class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer


class JobOpeningViewSet(viewsets.ModelViewSet):
    serializer_class = JobOpeningSerializer

    def get_queryset(self):
        # Public reads only return active jobs; authenticated users see all.
        if self.request.user and self.request.user.is_authenticated:
            return JobOpening.objects.all()
        return JobOpening.objects.filter(is_active=True)


class ContactSubmissionViewSet(viewsets.ReadOnlyModelViewSet):
    """Read-only viewset for admin to list contact submissions."""
    queryset = ContactSubmission.objects.all()
    serializer_class = ContactSubmissionSerializer
    permission_classes = [IsAuthenticated]


@api_view(['POST'])
@permission_classes([AllowAny])
def contact_view(request):
    name = request.data.get('name', '').strip()
    email = request.data.get('email', '').strip()
    category = request.data.get('category', '').strip()
    message = request.data.get('message', '').strip()

    if not name or not email or not message:
        return Response(
            {'error': 'Name, email, and message are required.'},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # Save to database
    submission = ContactSubmission.objects.create(
        name=name,
        email=email,
        category=category,
        message=message,
    )

    # Send notification email (fail silently so form still succeeds if SMTP not configured)
    recipient = getattr(settings, 'CONTACT_RECIPIENT_EMAIL', '') or getattr(settings, 'EMAIL_HOST_USER', '')
    if recipient and settings.EMAIL_HOST_USER:
        try:
            subject = f"New Contact: {name}" + (f" [{category}]" if category else "")
            body = (
                f"Name: {name}\n"
                f"Email: {email}\n"
                f"Category: {category or 'N/A'}\n\n"
                f"Message:\n{message}"
            )
            send_mail(subject, body, settings.DEFAULT_FROM_EMAIL, [recipient], fail_silently=True)
        except Exception:
            pass

    return Response({'success': True, 'id': submission.id}, status=status.HTTP_201_CREATED)
