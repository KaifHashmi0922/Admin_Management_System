# admin.py

from django.contrib import admin
from .models import Employee, Project, EmailOTP


# ============================================================
# Employee Admin
# ============================================================

@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "fullname",
        "email",
        "phone",
        "role",
        "is_logged",
        "status",
    )
    search_fields = ("fullname", "email", "phone")
    list_filter = ("status", "is_logged")
    ordering = ("-id",)


# ============================================================
# Project Admin
# ============================================================

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "project_type",
        "project_budget",
        "start_date",
        "end_date",
        "duration",
        "status",
    )
    search_fields = ("name", "project_type")
    list_filter = ("status", "project_type", "start_date")
    ordering = ("-id",)


# ============================================================
# Email OTP Admin
# ============================================================

@admin.register(EmailOTP)
class EmailOTPAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        
        "created_at",
        "expires_at",
        "is_verified",
    )
    search_fields = ("user__username", "user__email")
    list_filter = ("is_verified", "created_at")
    ordering = ("-created_at",)