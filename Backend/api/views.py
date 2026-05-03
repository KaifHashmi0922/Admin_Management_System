# ===============================
# IMPORTS
# ===============================

import json
from datetime import timedelta

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import check_password, make_password
from django.utils import timezone

from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated

from .models import Employee, Project, EmailOTP
from .serializers import EmployeeSerializer, ProjectSerializer
from django.core.mail import send_mail
from django.conf import settings


# ===============================
# DASHBOARD
# ===============================
# lw


@api_view(["GET"])
def employee_query_view(request):

    try:
        fullname = request.GET.get("name")
        email = request.GET.get("email")
        is_logged = request.GET.get("is_logged")
        status = request.GET.get("status")

        queryset = Employee.objects.all()

        # Filter by fullname
        if fullname:
            queryset = queryset.filter(fullname__icontains=fullname)

        # Filter by email
        if email:
            queryset = queryset.filter(email__iexact=email)

        # Filter by login status
        if is_logged:
            if is_logged.lower() == "login":
                queryset = queryset.filter(is_logged=True)
            elif is_logged.lower() == "logout":
                queryset = queryset.filter(is_logged=False)
            else:
                return JsonResponse({"message": "Invalid login status"}, status=400)

        # Filter by active status
        if status:
            if status.lower() == "active":
                queryset = queryset.filter(status=True)
            elif status.lower() == "deactive":
                queryset = queryset.filter(status=False)
            else:
                return JsonResponse({"message": "Invalid status"}, status=400)

        serializer = EmployeeSerializer(queryset, many=True)

        return JsonResponse({
            "message": "Data fetched successfully",
            "data": serializer.data
        }, status=200)

    except Exception as e:
        return JsonResponse({
            "message": "Error",
            "error": str(e)
        }, status=500)


def employee_query(reuquest):
    return JsonResponse({"message":"hi"})






    



@api_view(['GET'])
def dashboard(request):

    project_count = Project.objects.count()
    employee_count = Employee.objects.count()

    return JsonResponse({
        "projects": project_count,
        "employees": employee_count,
        "status": "success"
    })


# ===============================
# EMPLOYEE REGISTER
# ===============================

@csrf_exempt
def employee_register(request):
    data=json.loads(request.body)
    print(data)

    if request.method != "POST":
        return JsonResponse({"message": "Invalid method"}, status=405)

    data = json.loads(request.body)

    if Employee.objects.filter(email=data.get("email")).exists():
        return JsonResponse({"message": "Employee already exists"}, status=400)

    serializer = EmployeeSerializer(data=data)

    if serializer.is_valid():
        serializer.save()

        return JsonResponse({
            "message": "Employee registered successfully"
        }, status=201)

    return JsonResponse(serializer.errors, status=400)


# ===============================
# EMPLOYEE LOGIN
# ===============================

from rest_framework_simplejwt.tokens import RefreshToken
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth.hashers import check_password
import json


@csrf_exempt
def employee_login(request):

    if request.method != "POST":
        return JsonResponse({"message": "Invalid method"}, status=405)

    data = json.loads(request.body)

    email = data.get("email")
    password = data.get("password")

    emp = Employee.objects.filter(email=email).first()

    if not emp:
        return JsonResponse({"message": "Employee not found"}, status=404)

    if not check_password(password, emp.password):
        return JsonResponse({"message": "Invalid password"}, status=400)

    emp.is_logged = True
    emp.save()

    # Generate JWT tokens
    refresh = RefreshToken.for_user(emp)

    return JsonResponse({
        "message": "Login successful",

        "access": str(refresh.access_token),
        "refresh": str(refresh),

        "user": {
            "id": emp.id,
            "name": emp.username,
            "email": emp.email,
            "role": emp.role
        }
    })
# ===============================
# EMPLOYEE UPDATE
# ===============================

@api_view(['PATCH'])
def employee_update(request):
    data=json.loads(request.body)
    
    email,eid =[ request.data.get("email"),request.data.get("id",None)] 
       
    data['status']=True if data.get('status').lower()=="active" else False
    
    emp = Employee.objects.filter(email=email).first() or Employee.objects.filter(id=eid).first()
    if not emp:
        return JsonResponse({"message": "Employee not found"}, status=404)

    serializer = EmployeeSerializer(emp, data=data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return JsonResponse({
            "message": "Employee updated successfully",
            "data": serializer.data
        })

    return JsonResponse(serializer.errors, status=400)


# ===============================
# EMPLOYEE LIST
# ===============================

# @api_view(['GET'])
def employees_list(request):
    employees = Employee.objects.all()  

    serializer = EmployeeSerializer(employees, many=True)

    return JsonResponse(serializer.data, safe=False,status=200)


# ===============================
# EMPLOYEE PROFILE
# ===============================

@api_view(['POST'])
def employee_profile(request):

    email = request.data.get("email")

    emp = Employee.objects.filter(email=email).first()

    if not emp:
        return JsonResponse({"message": "Employee not found"}, status=404)

    serializer = EmployeeSerializer(emp)

    return JsonResponse(serializer.data)


# ===============================
# EMPLOYEE DELETE
# ===============================
    
@api_view(['DELETE'])
def employee_delete(request):
    email=json.loads(request.body)

    emp = Employee.objects.filter(email=email).first()

    if not emp:
        return JsonResponse({"message": "Employee not found"}, status=404)

    emp.delete()

    return JsonResponse({"message": "Employee deleted"})


# ===============================
# EMPLOYEE LOGOUT
# ===============================

@api_view(['POST'])
def employee_logout(request):
    print("logout called")
    email=json.loads(request.body)

    print(email)
    
    emp = Employee.objects.filter(email=email).first()

    if not emp:
        return JsonResponse({"message": "Employee not found"}, status=404)

    emp.is_logged = False
    emp.save()

    return JsonResponse({"message": "Logged out successfully"})


# ===============================
# EMPLOYEE SOFT DELETE
# ===============================

@api_view(['PUT', 'PATCH'])
def employee_status_change(request):
    email = request.data.get('email') or request.GET.get('email')
    if not email:
        return JsonResponse({"message": "Email required"}, status=400)
    
    emp = Employee.objects.filter(email=email).first()
    if not emp:
        return JsonResponse({"message": "Employee not found"}, status=404)
    
    # Toggle the status
    new_status = not emp.status
    emp.status = new_status
    emp.save()
    
    return JsonResponse({
        "message": "Status updated",
        "new_status": new_status,
        "status_code": 200
    })




def employee_is_active(request):
        data=json.loads(request.body)
        email=data.get("email")
        emp=Employee.objects.filter(email=email).first()
        if emp.is_active :
            return JsonResponse({'msg':'Employee Activated !!','status':200})
        return JsonResponse({'msg':'Employee Deactivated !!','status':200})



# ===============================
# CHANGE PASSWORD
# ===============================

@csrf_exempt
def employee_change_password(request):

    if request.method != "POST":
        return JsonResponse({"message": "Invalid method"}, status=405)

    data = json.loads(request.body)

    email = data.get("email")
    password = data.get("password")

    emp = Employee.objects.filter(email=email).first()

    if not emp:
        return JsonResponse({"message": "Employee not found"}, status=404)

    emp.password = make_password(password)
    emp.save()

    return JsonResponse({"message": "Password changed successfully"})


# ===============================
# PROJECT CREATE
# ===============================

@csrf_exempt
def project_register(request):

    if request.method != "POST":
        return JsonResponse({"message": "Invalid method"}, status=405)

    data = json.loads(request.body)

    serializer = ProjectSerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        return JsonResponse({"message": "Project created successfully"}, status=201)

    return JsonResponse(serializer.errors, status=400)


# ===============================
# PROJECT LIST
# ===============================

@api_view(['GET'])
def projects_list(request):

    projects = Project.objects.all()

    serializer = ProjectSerializer(projects, many=True)

    return JsonResponse(serializer.data, safe=False)


# ===============================
# PROJECT DETAIL
# ===============================

@api_view(['GET'])
def project_detail(request, id):

    project = Project.objects.filter(id=id).first()

    if not project:
        return JsonResponse({"message": "Project not found"}, status=404)

    serializer = ProjectSerializer(project)

    return JsonResponse(serializer.data)


# ===============================
# PROJECT UPDATE
# ===============================

@csrf_exempt
def project_update(request, id):

    if request.method != "PUT":
        return JsonResponse({"message": "Invalid method"}, status=405)

    project = Project.objects.filter(id=id).first()

    if not project:
        return JsonResponse({"message": "Project not found"}, status=404)

    data = json.loads(request.body)

    serializer = ProjectSerializer(project, data=data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return JsonResponse({"message": "Project updated successfully"})

    return JsonResponse(serializer.errors, status=400)


# ===============================
# PROJECT DELETE
# ===============================

@api_view(['DELETE'])
def project_delete(request, id):

    project = Project.objects.filter(id=id).first()

    if not project:
        return JsonResponse({"message": "Project not found"}, status=404)

    project.delete()

    return JsonResponse({"message": "Project deleted successfully"})


# ===============================
# PROJECT SOFT DELETE
# ===============================

@api_view(['PUT'])
def project_soft_delete(request, id):

    project = Project.objects.filter(id=id).first()

    if not project:
        return JsonResponse({"message": "Project not found"}, status=404)

    project.status = False
    project.save()

    return JsonResponse({"message": "Project deactivated successfully"})


# ===============================
# SEND OTP
# ===============================

@csrf_exempt
def send_otp(request):
    print("data")

    if request.method != "POST":
        return JsonResponse({"message": "Invalid method"}, status=405)

    data = json.loads(request.body)
    print(data)

    email = data.get("email")
    print(email)

    emp = Employee.objects.filter(email=email).first()
    print(emp)

    if not emp:
        return JsonResponse({"message": "Employee not found"}, status=404)
    print("vd")

    otp = EmailOTP.generate_otp()

    hashed_otp = make_password(otp)
    print("otp send",hashed_otp)

    expires = timezone.now() + timedelta(minutes=5)

    EmailOTP.objects.create(
        employee=emp,
        otp=hashed_otp,
        expires_at=expires
    )

    print("OTP:", otp)

    return JsonResponse({
        "message": "OTP sent successfully",
        "otp_for_testing": otp
    })


# ===============================
# VERIFY OTP
# ===============================
@csrf_exempt
def send_otp(request):

    if request.method != "POST":
        return JsonResponse({"message": "Invalid method"}, status=405)

    data = json.loads(request.body)
    email = data.get("email")

    emp = Employee.objects.filter(email=email).first()

    if not emp:
        return JsonResponse({"message": "Employee not found"}, status=404)

    otp = EmailOTP.generate_otp()

    hashed_otp = make_password(otp)

    expires = timezone.now() + timedelta(minutes=5)

    EmailOTP.objects.filter(employee=emp).delete()

    EmailOTP.objects.create(
        employee=emp,
        otp=hashed_otp,
        expires_at=expires
    )

    # ✅ Send Email
    send_mail(
        "Your OTP Code",
        f"Your OTP is {otp}. It will expire in 5 minutes.",
        settings.EMAIL_HOST_USER,
        [email],
        fail_silently=False,
    )

    return JsonResponse({
        "message": "OTP sent successfully"
    })
# ===============================
# RESEND OTP
# ===============================
@csrf_exempt
def verify_otp(request):

    if request.method != "POST":
        return JsonResponse({"message": "Invalid method"}, status=405)

    data = json.loads(request.body)

    email = data.get("email")
    entered_otp = data.get("otp")

    emp = Employee.objects.filter(email=email).first()

    if not emp:
        return JsonResponse({"message": "Employee not found"}, status=404)

    otp_record = EmailOTP.objects.filter(employee=emp).last()

    if not otp_record:
        return JsonResponse({"message": "OTP not found"}, status=404)

    if otp_record.is_expired():
        return JsonResponse({"message": "OTP expired"}, status=400)

    if not otp_record.verify_otp(entered_otp):
        return JsonResponse({"message": "Invalid OTP"}, status=400)

    otp_record.is_verified = True
    otp_record.save()

    return JsonResponse({
        "message": "OTP verified successfully"
    })


@csrf_exempt
def resend_otp(request):

    if request.method != "POST":
        return JsonResponse({"message": "Invalid method"}, status=405)

    data = json.loads(request.body)

    email = data.get("email")

    emp = Employee.objects.filter(email=email).first()

    if not emp:
        return JsonResponse({"message": "Employee not found"}, status=404)

    otp = EmailOTP.generate_otp()

    hashed_otp = make_password(otp)

    expires = timezone.now() + timedelta(minutes=5)

    EmailOTP.objects.filter(employee=emp).delete()

    EmailOTP.objects.create(
        employee=emp,
        otp=hashed_otp,
        expires_at=expires
    )

    send_mail(
    "Your OTP Code",
    f"Your new OTP is {otp}.",
    settings.EMAIL_HOST_USER,
    [email],
)

    return JsonResponse({
        "message": "OTP resent successfully",
        "otp_for_testing": otp
    })


























































































































# # ===============================
# # IMPORTS
# # ===============================

# import json
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from django.contrib.auth.hashers import check_password, make_password

# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated

# from rest_framework_simplejwt.tokens import RefreshToken

# from .models import Employee, Project,EmailOTP
# from .serializers import EmployeeSerializer, User
# from django.http import  HttpResponse



# from datetime import datetime
# import requests

# from django.utils import timezone
# from datetime import timedelta






# # ===============================
# # CUSTOM EXCEPTION
# # ===============================

# class EmployeeException(Exception):
#     """Custom exception for employee-related errors"""
#     pass




# # ===============================
# # DASHBOARD (PROTECTED ROUTE)
# # ===============================

# # @api_view(['GET'])
# # @permission_classes([IsAuthenticated])
# def employee_query_view(request):
#     try:
#         fullname=request.GET.get("name","kaif")
#         email=request.GET.get("email","kaifhashmi0922@gmail.com") 
#         is_logged=request.GET.get("is_logged","Logout") 
#         print("sfwef")
#         is_active=request.GET.get("status","deactive")
#         queryset=Employee.objects.all()
#         print(" hbhb")
    
#         if fullname:
#             queryset=queryset.filter(fullname__icontains=fullname)
             
#         if email:
#              queryset=queryset.filter(email__iexact=email)
     
#         if is_logged:
#             if is_logged.lower()=="login":
#                 is_logged=True
#             elif is_logged.lower()=="logout":
#                 is_logged=False
#             else:
#                 raise ("Invalid")
          
#             queryset=queryset.filter(is_active=is_logged)
#             if is_active:
#                 if is_active.lower()=="active":
#                     is_active=True
#                 elif is_active.lower()=="deactive":
#                     is_active=False
#                 else:
#                     raise ("Invalid")
             
#                 queryset=queryset.filter(status=is_active)
#         else:
#             return JsonResponse({'message':"Invalid Data"})
#         serializer_data=EmployeeSerializer(queryset,many=True)
#         return JsonResponse({"message":"data Fetched","data":serializer_data.data},status=200)
            
        
#     except EmployeeException as e:
#         return JsonResponse({"message":str(e)},status=400)
    


# # @api_view(["GET"])
# # @permission_classes([IsAuthenticated])
# def dashboard(request):
#     """
#     Protected dashboard API.
#     Requires JWT token in header:
#     Authorization: Bearer <access_token>
#     """
#     project_count = Project.objects.count()
#     employee_count = Employee.objects.count()

#     return JsonResponse({
     
#         "projects": project_count,
#         "employees": employee_count,
#         "status": "success"
#     }, status=200)


# # ===============================
# # EMPLOYEE REGISTER
# # ===============================

# @csrf_exempt
# def employee_register(request):

#     try:
#         if request.method != "POST":
#             return JsonResponse(
#                 {"message": "Invalid request method"},
#                 status=405
#             )

#         data = json.loads(request.body)

#         if Employee.objects.filter(email=data.get("email")).exists():
#             return JsonResponse({"message": "Employee already registered"}, status=400)

#         serializer = EmployeeSerializer(data=data)

#         if serializer.is_valid():
#             user = serializer.save()   # password hashed in serializer

#             # refresh = RefreshToken.for_user(user)

#             return JsonResponse({
#                 "message": "Employee registered successfully",
#                 # "access": str(refresh.access_token),
#                 # "refresh": str(refresh)
#             }, status=201)

#         return JsonResponse(serializer.errors, status=400)

#     except Exception as e:
#         return JsonResponse(
#             {"message": "Server error", "error": str(e)},
#             status=500
#         )


# # ===============================
# # EMPLOYEE LOGIN (JWT VERSION)
# # ===============================

# @csrf_exempt
# def employee_login(request):
#     """
#     Login employee and generate JWT tokens.
#     Returns:
#         - access token
#         - refresh token
#     """

#     try:
#         if request.method != "POST":
#             return JsonResponse(
#                 {"message": "Invalid request method"},
#                 status=405
#             )

#         data = json.loads(request.body)
#         email = data.get("email")
#         password = data.get("password")

#         if not email or not password:
#             return JsonResponse(
#                 {"message": "Email and password required"},
#                 status=400
#             )

#         emp = Employee.objects.filter(email=email).first()

#         if not emp:
#             return JsonResponse(
#                 {"message": "Employee not found"},
#                 status=404
#             )

#         # Check hashed password
#         if not check_password(password, emp.password):
#             return JsonResponse(
#                 {"message": "Invalid password"},
#                 status=400
#             )
#         # if  emp.is_active:
#         #     return JsonResponse(
#         #         {"message": "Employee is already active. Please contact admin."},
#         #         status=403
#         #     )
#         # else:
#         #     emp.is_active=True
#         #     emp.save()

#         # Generate JWT tokens
#         # refresh = RefreshToken.for_user(emp)

#         return JsonResponse({
#             "message": "Login successful",
#             # "access": str(refresh.access_token),
#             # "refresh": str(refresh)
#         }, status=200)

#     except Exception as e:
#         return JsonResponse(
#             {"message": "Server error", "error": str(e)},
#             status=500
#         )
        
        
# def employee_update(request,email):
  
#     try:
#         if request.method=="PUT":
#             data=json.loads(request.body)
#             emp=Employee.objects.filter(email=email)
#             serializer=EmployeeSerializer(emp,data=data,partial=True)
#             if not (serializer.is_valid()):
#                 raise EmployeeException({'msg':'Data is Invalid'},status=200)
#             # serializer.save()
#             return JsonResponse({'msg':'Profile Updated'})
#     except EmployeeException as msg:
#         return JsonResponse({'msg':msg})
    
    


# # ===============================
# # EMPLOYEE LIST
# # ===============================

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def employees_list(request):
#     """
#     Return all employees.
#     Protected route.
#     """

#     employees = Employee.objects.values(
#         "id",
#         "fullname",
#         "email",
#         "phone",
#     )

#     return JsonResponse(employees, safe=False, status=200)


# # ===============================
# # EMPLOYEE PROFILE (PROTECTED)
# # ===============================

# @api_view(['POST'])
# def employee(request):
#     """
#     Get single employee profile.
#     Protected route.
#     """    
#     if request.body:
#         email=json.loads(request.body)
#         emp = Employee.objects.filter(email=email).first()

#     if not emp:
#         return JsonResponse(
#             {"message": "Employee not found"},
#             status=404
#         )
#     print(emp.role)
#     emp_data = {
#         # "fullname": emp.fullname, 
#         "email": emp.email,
#         "phone": emp.phone,
#         "role":emp.role.title()  ,  
#         "status": emp.status
#     }

#     return JsonResponse(emp_data, status=200)


# # ===============================
# # EMPLOYEE DELETE
# # ===============================

# @api_view(['DELETE'])
# @permission_classes([IsAuthenticated])
# def employee_delete(request, email):
#     """
#     Permanently delete employee.
#     Protected route.
#     """

#     emp = Employee.objects.filter(email=email).first()

#     if not emp:
#         return JsonResponse(
#             {"message": "Employee not found"},
#             status=404
#         )

#     emp.delete()

#     return JsonResponse(
#         {"message": "Employee permanently deleted"},
#         status=200
#     )
    
# @api_view(['POST'])
# def employee_logout(request):
#     try:
#         email=json.loads(request.body)
#         emp=Employee.objects.filter(email=email).first()
#         if emp.is_active :
#             emp.is_active=False
#             emp.save()
#             return JsonResponse({'message':'Employee Logged Out !!'}, status=200)
#     except Exception as e:
#         return JsonResponse({'message': str(e)}, status=500)   
   
        
    
    
# def employee_is_active(request):
#         data=json.loads(request.body)
#         email=data.get("email")
#         emp=Employee.objects.filter(email=email).first()
#         if emp.is_active :
#             return JsonResponse({'msg':'Employee Activated !!','status':200})
#         return JsonResponse({'msg':'Employee Deactivated !!','status':200})


# def employee_soft_delete(request,email):  
#     emp=Employee.objects.filter(email=email).first()
#     emp.status=False
#     emp.save()
#     if emp.status :
#         return JsonResponse({'msg':'Employee Activated !!','status':200})
#     return JsonResponse({'msg':'Employee Deactivated !!','status':200})


# @csrf_exempt
# def employee_change_password(request):
#     data=json.loads(request.body)
#     email=data.get("email")
#     password=data.get("formData").get("password")  
#     emp=Employee.objects.filter(email=email).first()
#     emp.password=make_password(password)
#     emp.save()
#     return JsonResponse({"message":"Password Changed"},status=200)
    
    
    
