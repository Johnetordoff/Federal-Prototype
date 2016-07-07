from rest_framework import permissions

class isDepartment(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):

        # User is a superuser?
        try:
            usertype = request.user.usertype
        except:
            return True

        if usertype.usertype == "manager":
            return obj.department == usertype.department
        return False
