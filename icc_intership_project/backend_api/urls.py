from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import *

user_router = DefaultRouter()
class_management_router = DefaultRouter()
quiz_router = DefaultRouter()

# user router
user_router.register('admin', AdminView, basename='admin')
user_router.register('teacher', TeacherView, basename='teacher')
user_router.register('student', StudentView, basename='student')

# class router
class_management_router.register('course', CourseView, basename='course')
class_management_router.register('class', ClassView, basename='class')
class_management_router.register('chapter', ChapterView, basename='chapter')
class_management_router.register('evaluation', EvaluationView, basename='evaluation')

# quiz router
quiz_router.register('quiz', QuizView, basename='quiz')
quiz_router.register('question', QuestionView, basename='question')
quiz_router.register('answer', AnswerView, basename='answer')
quiz_router.register('quiz_taker', QuizTakerView, basename='quiz_taker')

urlpatterns = [
    path('user/', include(user_router.urls)),
    path('user/<int:pk>/', include(user_router.urls)),
    path('class_management/', include(class_management_router.urls)),
    path('class_management/<int:pk>/', include(class_management_router.urls)),
    path('quiz_management/', include(quiz_router.urls)),
    path('quiz_management/<int:pk>/', include(quiz_router.urls)),
]