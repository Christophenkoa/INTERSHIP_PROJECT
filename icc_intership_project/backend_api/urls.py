from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import *

user_router = DefaultRouter()
class_management_router = DefaultRouter()
quiz_router = DefaultRouter()

# user router
user_router.register('admin', AdminView, base_name='admin')
user_router.register('teacher', TeacherView, base_name='teacher')
user_router.register('student', StudentView, base_name='student')

# class router
class_management_router.register('course', CourseView, base_name='course')
class_management_router.register('class', ClassView, base_name='class')
class_management_router.register('chapter', ChapterView, base_name='chapter')
class_management_router.register('evaluation', EvaluationView, base_name='evaluation')

# quiz router
quiz_router.register('quiz', QuizView, base_name='quiz')
quiz_router.register('question', QuestionView, base_name='question')
quiz_router.register('answer', AnswerView, base_name='answer')
quiz_router.register('quiz_taker', QuizTakerView, base_name='quiz_taker')

urlpatterns = [
    path('user/', include(user_router.urls)),
    path('user/<int:pk>/', include(user_router.urls)),
    path('class_management/', include(class_management_router.urls)),
    path('class_management/<int:pk>/', include(class_management_router.urls)),
    path('quiz_management/', include(quiz_router.urls)),
    path('quiz_management/<int:pk>/', include(quiz_router.urls)),
]