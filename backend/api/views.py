from api.models import Document, Department, Usertype, Grant, Doctest
from api.serializers import DocumentSerializer, DepartmentSerializer, UsertypeSerializer, UserSerializer, GrantSerializer, DoctestSerializer
from rest_framework import generics, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from django.contrib.auth.models import User
from api.permissions import isDepartment
from rest_framework.parsers import FileUploadParser
from rest_framework.views import APIView

@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'documents': reverse('document-list', request=request, format=format),
        'departments': reverse('department-list', request=request, format=format),
        'users': reverse('user-list', request=request, format=format),
        'usertypes': reverse('usertype-list', request=request, format=format),
        'grants': reverse('grant-list', request=request, format=format),
        'doctests': reverse('doctest-list', request=request, format=format),
    })


class DocumentList(generics.ListCreateAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    permission_classes = (permissions.IsAuthenticated, isDepartment)

class DocumentDetail(generics.RetrieveUpdateDestroyAPIView):
    parser_classes = (FileUploadParser,)
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    permission_classes = (permissions.IsAuthenticated, isDepartment)

class DepartmentList(generics.ListCreateAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

class DepartmentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UsertypeList(generics.ListCreateAPIView):
    queryset = Usertype.objects.all()
    serializer_class = UsertypeSerializer

class UsertypeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Usertype.objects.all()
    serializer_class = UsertypeSerializer

class GrantList(generics.ListCreateAPIView):
    queryset = Grant.objects.all()
    serializer_class = GrantSerializer
    permission_classes = (permissions.IsAuthenticated, isDepartment)

class GrantDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Grant.objects.all()
    serializer_class = GrantSerializer
    permission_classes = (permissions.IsAuthenticated, isDepartment)

class DoctestList(generics.ListCreateAPIView):
    queryset = Doctest.objects.all()
    serializer_class = DoctestSerializer
    permission_classes = (permissions.IsAuthenticated, isDepartment)

class DoctestDetail(generics.RetrieveUpdateDestroyAPIView):
    # parser_classes = (FileUploadParser,)
    queryset = Doctest.objects.all()
    serializer_class = DoctestSerializer
    permission_classes = (permissions.IsAuthenticated, isDepartment)

class FileUploadView(APIView):
    parser_classes = (FileUploadParser,)

    def put(self, request, filename, format=None):
        file_obj = request.data['file']
        return Response(status=204)
    def get(self, request, filename, format=None):
    	file_obj = request.FILES['file']
    	return Response(status=204)


