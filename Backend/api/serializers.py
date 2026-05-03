from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Employee, Project, EmailOTP


# ============================================================
# Employee Serializer
# ============================================================

class EmployeeSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(required=False)

    fullname = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    role=serializers.CharField(max_length=20,default="Employee")
    phone = serializers.CharField(max_length=255)
    password = serializers.CharField(write_only=True)

    is_logged = serializers.BooleanField(default=False)
    status = serializers.BooleanField(default=True)

    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data["password"])

       
        if not validated_data.get("username"):
            validated_data["username"] = validated_data["email"]

        return Employee.objects.create(**validated_data)

    def update(self, instance, validated_data):
        # instance.username = validated_data.get("username", instance.username)
        instance.fullname = validated_data.get("fullname", instance.fullname)
        instance.email = validated_data.get("email", instance.email)
        instance.role=validated_data.get("role",instance.role)
        instance.phone = validated_data.get("phone", instance.phone)

        if "password" in validated_data:
            instance.password = make_password(validated_data["password"])

        instance.is_logged = validated_data.get("is_logged", instance.is_logged)
        instance.status = validated_data.get("status", instance.status)

        instance.save()
        return instance


# ============================================================
# Project Serializer
# ============================================================

class ProjectSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=255)
    description = serializers.CharField(max_length=255)
    project_budget = serializers.DecimalField(max_digits=10, decimal_places=2)

    start_date = serializers.DateTimeField(required=False)
    end_date = serializers.DateTimeField(required=False)

    project_type = serializers.CharField(max_length=200)
    duration = serializers.IntegerField(required=False)

    project_logo = serializers.FileField(required=False)
    status = serializers.BooleanField(default=True)

    def create(self, validated_data):
        return Project.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.description = validated_data.get("description", instance.description)
        instance.project_budget = validated_data.get("project_budget", instance.project_budget)

        instance.start_date = validated_data.get("start_date", instance.start_date)
        instance.end_date = validated_data.get("end_date", instance.end_date)

        instance.project_type = validated_data.get("project_type", instance.project_type)
        instance.duration = validated_data.get("duration", instance.duration)

        instance.project_logo = validated_data.get("project_logo", instance.project_logo)
        instance.status = validated_data.get("status", instance.status)

        instance.save()
        return instance


# ============================================================
# Email OTP Serializer
# ============================================================

class EmailOTPSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    user = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all())
    otp = serializers.CharField(max_length=128)
    created_at = serializers.DateTimeField(read_only=True)
    expires_at = serializers.DateTimeField()
    is_verified = serializers.BooleanField(default=False)

    def create(self, validated_data):
        return EmailOTP.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.otp = validated_data.get("otp", instance.otp)
        instance.expires_at = validated_data.get("expires_at", instance.expires_at)
        instance.is_verified = validated_data.get("is_verified", instance.is_verified)

        instance.save()
        return instance