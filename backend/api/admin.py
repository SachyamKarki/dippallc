from django.contrib import admin
from .models import Post, Testimonial, JobOpening, ContactSubmission


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'tag', 'created_at')
    search_fields = ('title', 'tag')


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('name', 'role')
    search_fields = ('name',)


@admin.register(JobOpening)
class JobOpeningAdmin(admin.ModelAdmin):
    list_display = ('title', 'location', 'job_type', 'category', 'is_active', 'created_at')
    list_filter = ('is_active', 'category', 'job_type')
    search_fields = ('title', 'location', 'category')
    list_editable = ('is_active',)


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'category', 'submitted_at', 'is_read')
    list_filter = ('is_read', 'category')
    search_fields = ('name', 'email', 'message')
    list_editable = ('is_read',)
    readonly_fields = ('name', 'email', 'category', 'message', 'submitted_at')
