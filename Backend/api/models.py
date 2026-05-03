# models.py

import random
from django.db import models
from django.utils import timezone
from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import AbstractUser
from django.db import models

class Employee(AbstractUser):

    fullname = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)

    ROLE_CHOICES = (
        ("Admin", "Admin"),
        ("Manager", "Manager"),
        ("Employee", "Employee"),
        ("Guest", "Guest"),
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default="Employee"
    )

    is_logged = models.BooleanField(default=False)
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.username

# ============================================================
# Project Model
# ============================================================

class Project(models.Model):
    name = models.CharField(max_length=255, db_index=True)
    description = models.CharField(max_length=255)
    project_budget = models.DecimalField(max_digits=10, decimal_places=2)

    start_date = models.DateTimeField(null=True, blank=True)
    end_date = models.DateTimeField(null=True, blank=True)

    project_type = models.CharField(max_length=200, default="Website")
    duration = models.IntegerField(null=True, blank=True)

    project_logo = models.FileField(upload_to="projects/", null=True, blank=True)
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.name


# ============================================================
# Email OTP Model
# ============================================================

class EmailOTP(models.Model):

    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)

    otp = models.CharField(max_length=128)  # hashed OTP

    created_at = models.DateTimeField(auto_now_add=True)

    expires_at = models.DateTimeField()

    is_verified = models.BooleanField(default=False)

    def is_expired(self):
        return timezone.now() > self.expires_at

    def verify_otp(self, raw_otp):
        return check_password(raw_otp, self.otp)

    @staticmethod
    def generate_otp():
        return str(random.randint(100000, 999999))