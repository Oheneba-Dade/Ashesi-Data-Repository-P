# from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.utils import timezone
from django.utils.timezone import localtime
from .helpers import check_email_domain


class CustomUserManager(BaseUserManager):
    """
    Manages the CustomUser class and allows for the creation of regular
    and superusers
    """

    def create_user(self, email, password=None, **extra_fields):
        """ Creates and saves a user """

        if not email:
            raise ValueError('The Email field has not been set')

        email = self.normalize_email(email).lower()

        # Set defaults BEFORE instantiating the model
        if check_email_domain(email):
            extra_fields.setdefault('role', 'internal')
        else:
            extra_fields.setdefault('role', 'external')

        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_superuser', False)
        extra_fields.setdefault('is_staff', False)

        # Create user instance
        user = self.model(email=email, **extra_fields)

        if extra_fields.get('is_superuser'):
            user.set_password(password)
        else:
            user.set_unusable_password()

        user.save()
        return user



    def create_superuser(self, email, password, **extra_fields):
        """ Creates and saves a superuser """

        # Check valid password
        if password is None:
            raise TypeError('Superusers must have a password.')

        # Set new defaults
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', 'admin')
        extra_fields.setdefault('is_staff', True)

        # # Check that appropriate permissions are set
        # if extra_fields.get('is_superuser') is not True:
        #     raise ValueError('Superuser must have is_superuser=True')
        # Set new defaults

        # Create the user
        user = self.create_user(email, password, **extra_fields)

        return user

    def create_admin(self, email, password, **extra_fields):

        if password is None:
            raise TypeError('Owners must have a password.')

        extra_fields.setdefault('is_superuser', False)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('role', 'admin')

        # Create the user
        user = self.create_user(email, password, **extra_fields)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = [
        # fill with actual user roles 
        ('internal', 'Internal'),
        ('external', 'External'),
        ('admin', 'Admin')
    ]

    email = models.EmailField(max_length=50, unique=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='external')
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)
    login_attempts = models.IntegerField(default=0)

    REQUIRED_FIELDS = ['role']
    USERNAME_FIELD = 'email'

    objects = CustomUserManager()

    class Meta(AbstractBaseUser.Meta):
        swappable = 'AUTH_USER_MODEL'

    def __str__(self):
        return f"{self.email} ({self.role if self.role else 'No Role'})"


class Authors(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.name + self.email


class Collection(models.Model):
    ACCESS_CHOICES = [
        ('public', 'Public'),
        ('private', 'Private'),
        ('restricted', 'Restricted'),
        # needed or naa ?
    ]
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    title = models.CharField(max_length=255)
    authors = models.ManyToManyField(Authors)
    abstract = models.TextField()
    keywords = ArrayField(models.CharField(max_length=300), blank=True, default=list,
                          help_text="Comma-separated keywords for search and filtering.")
    date_of_publication = models.DateTimeField(default=timezone.now)
    comment = models.TextField(blank=True, null=True)
    doi_link = models.URLField(max_length=500, null=True, blank=True)
    instance_representation = models.CharField(max_length=500, blank=True, null=True, help_text="What do the instances "
                                                                                                "in the dataset represent")
    view_count = models.IntegerField(default=0)

    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE)
    upload_date = models.DateTimeField(default=timezone.now)
    access_level = models.CharField(max_length=20, choices=ACCESS_CHOICES, default='restricted')
    tags = models.ManyToManyField("Tag", blank=True)
    category = models.ForeignKey("Category", on_delete=models.SET_NULL, null=True, blank=True)

    approval_status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    approved_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True,
                                    related_name='approved_collections')
    approved_at = models.DateTimeField(null=True, blank=True)


    rejected_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='rejected_collections')
    rejected_at = models.DateTimeField(null=True, blank=True)

    def approve(self, admin_user):
        self.approval_status = 'approved'
        self.approved_by = admin_user
        self.approved_at = timezone.now()
        self.rejected_at = None
        self.rejected_by = None
        self.save()

    def reject(self, admin_user):
        self.approval_status = 'rejected'
        self.rejected_by = admin_user
        self.rejected_at = timezone.now()
        self.approved_at = None
        self.approved_by = None
        self.save()

    def is_approved(self):
        return self.approval_status == 'approved'
    
    def is_rejected(self):
        return self.approval_status == 'rejected'

    def __str__(self):
        formatted_date = localtime(self.upload_date).strftime('%Y-%m-%d %H:%M')
        base_info = f"{self.title} | Uploaded by: {self.uploaded_by.email} | Date: {formatted_date} | Status: {self.approval_status}"

        if self.approval_status == 'approved':
            return f"{base_info} | Approved by: {self.approved_by}"
        elif self.approval_status == 'rejected':
            return f"{base_info} | Rejected by: {self.rejected_by}"
        return base_info

    class Meta:
        ordering = ["-upload_date"]
        verbose_name = "Dataset"
        verbose_name_plural = "Collections"


class DatasetFile(models.Model):
    collection = models.ForeignKey(Collection, on_delete=models.CASCADE, related_name="files", null=True, blank=True)
    file_name = models.CharField(max_length=50)
    file_url = models.URLField(max_length=500)
    file_type = models.CharField(max_length=50, blank=True, null=True)  # CSV, JSON, Excel, etc.
    uploaded_at = models.DateTimeField(auto_now_add=True)
    download_count = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.Collection.title} - {self.file.url}"


class Tag(models.Model):
    TAG_CHOICES = [
        ("Machine Learning", "Machine Learning"),
        ("Computer Vision", "Computer Vision"),
        ("Cybersecurity", "Cybersecurity"),
        ("Blockchain", "Blockchain"),
        # should we use predifined choices
    ]

    name = models.CharField(max_length=50, choices=TAG_CHOICES, unique=True)

    def __str__(self):
        return self.name


class Category(models.Model):
    # do we use choices for categories too
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Review(models.Model):
    collection = models.ForeignKey(Collection, on_delete=models.CASCADE, related_name="reviews", null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField(default=5)  # are we using the rating??
    comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review by {self.user.username} on {self.collection.title}"


class AccessRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    collection = models.ForeignKey(Collection, on_delete=models.CASCADE, related_name="access_requests", blank=True,
                                   null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    justification = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    requested_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Access request for {self.collection.title} by {self.user.username}"


class OTP(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    otp = models.TextField(max_length=6)
    life_time_mins = models.IntegerField(default=5)
    created_at = models.DateTimeField(default=timezone.now, db_index=True)
    expiry_date = models.DateTimeField()

    def __str__(self):
        return f"OTP {self.otp} for {self.user}"

    class Meta:
        ordering = ['-created_at']


class   Statistics(models.Model):
    download_count = models.IntegerField(default=0)
    view_count = models.IntegerField(default=0)
    author_count = models.IntegerField(default=0)
    collection_count = models.IntegerField(default=0)

    def __str__(self):
        return (f"downloads:{self.download_count} downloads,"
                f"{self.view_count} views"
                f"{self.author_count} authors"
                f"{self.collection_count} collections")
