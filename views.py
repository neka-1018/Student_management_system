from rest_framework import viewsets, filters
from .models import Student
from .serializers import StudentSerializer


class StudentViewSet(viewsets.ModelViewSet):
    serializer_class = StudentSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['student_id', 'name', 'email']

    def get_queryset(self):
        queryset = Student.objects.all()
        department = self.request.query_params.get('department')
        year = self.request.query_params.get('year')
        if department:
            queryset = queryset.filter(department=department)
        if year:
            queryset = queryset.filter(year=year)
        return queryset
