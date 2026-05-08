from django.db import models


class Post(models.Model):
    title = models.CharField(max_length=255)
    tag = models.CharField(max_length=50)
    text = models.TextField()
    image_url = models.URLField(max_length=500, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Testimonial(models.Model):
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    quote = models.TextField()
    image_url = models.URLField(max_length=500, blank=True, null=True)

    def __str__(self):
        return self.name


class JobOpening(models.Model):
    title = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    job_type = models.CharField(max_length=100, default="Full-time")
    category = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} ({self.location})"
