from django.contrib import admin
from .models import Post, Testimonial, JobOpening


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
