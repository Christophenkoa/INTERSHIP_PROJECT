from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .serializers import *


# Create your views here.


# user
class AdminView(ModelViewSet):
    serializer_class = AdminSerializer
    queryset = Admin.objects.all()


class TeacherView(ModelViewSet):
    serializer_class = TeacherSerializer
    queryset = Teacher.objects.all()


class StudentView(ModelViewSet):
    serializer_class = StudentSerializer
    queryset = Student.objects.all()


# class management
class CourseView(ModelViewSet):
    serializer_class = CourseSerializer
    queryset = Course.objects.all()


class ClassView(ModelViewSet):
    serializer_class = ClassSerializer
    queryset = Class.objects.all()


class ChapterView(ModelViewSet):
    serializer_class = ChapterSerializer
    queryset = Chapter.objects.all()


class EvaluationView(ModelViewSet):
    serializer_class = EvaluationSerializer
    queryset = Evaluation.objects.all()


# Quiz management
class QuizView(ModelViewSet):
    serializer_class = QuizSerializer
    queryset = Quiz.objects.all()


class QuizTakerView(ModelViewSet):
    serializer_class = QuizTakerSerializer
    queryset = QuizTaker.objects.all()


class QuestionView(ModelViewSet):
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()


class AnswerView(ModelViewSet):
    serializer_class = AnswerSerializer
    queryset = Answer.objects.all()
