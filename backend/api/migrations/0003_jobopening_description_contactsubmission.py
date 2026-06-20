from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_jobopening'),
    ]

    operations = [
        migrations.AddField(
            model_name='jobopening',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.CreateModel(
            name='ContactSubmission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('email', models.EmailField(max_length=254)),
                ('category', models.CharField(blank=True, max_length=100)),
                ('message', models.TextField()),
                ('submitted_at', models.DateTimeField(auto_now_add=True)),
                ('is_read', models.BooleanField(default=False)),
            ],
            options={
                'ordering': ['-submitted_at'],
            },
        ),
    ]
