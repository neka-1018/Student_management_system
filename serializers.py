import re
from rest_framework import serializers
from .models import Student


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

    def validate_student_id(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("Student ID cannot be empty.")
        qs = Student.objects.filter(student_id=value)
        if self.instance:
            qs = qs.exclude(id=self.instance.id)
        if qs.exists():
            raise serializers.ValidationError("This student ID already exists.")
        return value

    def validate_name(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("Name cannot be empty.")
        return value

    def validate_email(self, value):
        qs = Student.objects.filter(email=value)
        if self.instance:
            qs = qs.exclude(id=self.instance.id)
        if qs.exists():
            raise serializers.ValidationError("This email is already registered.")
        return value

    def validate_phone(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("Phone number cannot be empty.")
        pattern = r'^[0-9+\-\s]{7,15}$'
        if not re.match(pattern, value):
            raise serializers.ValidationError("Enter a valid phone number.")
        return value

    def validate_year(self, value):
        if value < 1 or value > 4:
            raise serializers.ValidationError("Year must be between 1 and 4.")
        return value
