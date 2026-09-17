from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Student


class StudentAPITestCase(APITestCase):
    def setUp(self):
        self.student_data = {
            "student_id": "S001",
            "name": "John Doe",
            "email": "john@example.com",
            "phone": "9876543210",
            "department": "CSE",
            "year": 2,
            "date_of_birth": "2003-05-10",
            "gender": "Male",
            "address": "Chennai"
        }

    def test_create_student(self):
        url = reverse('student-list')
        response = self.client.post(url, self.student_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Student.objects.count(), 1)

    def test_duplicate_student_id(self):
        Student.objects.create(**self.student_data)
        url = reverse('student-list')
        second = dict(self.student_data)
        second['email'] = 'other@example.com'
        response = self.client.post(url, second, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_invalid_email(self):
        url = reverse('student-list')
        data = dict(self.student_data)
        data['email'] = 'not-an-email'
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_list_students(self):
        Student.objects.create(**self.student_data)
        url = reverse('student-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_delete_student(self):
        student = Student.objects.create(**self.student_data)
        url = reverse('student-detail', args=[student.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Student.objects.count(), 0)
