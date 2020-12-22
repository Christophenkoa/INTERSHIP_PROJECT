from django.shortcuts import render
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .serializers import *


# Create your views here.


# user
class AdminView(ModelViewSet):
    serializer_class = AdminSerializer
    queryset = Admin.objects.all()
    permission_classes = (IsAuthenticated,)


class TeacherView(ModelViewSet):
    serializer_class = TeacherSerializer
    queryset = Teacher.objects.all()
    permission_classes = (IsAuthenticated,)


class StudentView(ModelViewSet):
    serializer_class = StudentSerializer
    queryset = Student.objects.all()
    permission_classes = (IsAuthenticated,)


# class management
class CourseView(ModelViewSet):
    serializer_class = CourseSerializer
    queryset = Course.objects.all()
    permission_classes = (IsAuthenticated,)


class ClassView(ModelViewSet):
    serializer_class = ClassSerializer
    queryset = Class.objects.all()
    permission_classes = (AllowAny,)


class ChapterView(ModelViewSet):
    serializer_class = ChapterSerializer
    queryset = Chapter.objects.all()
    permission_classes = (IsAuthenticated,)


class EvaluationView(ModelViewSet):
    serializer_class = EvaluationSerializer
    queryset = Evaluation.objects.all()
    permission_classes = (IsAuthenticated,)


# Quiz management
class QuizView(ModelViewSet):
    serializer_class = QuizSerializer
    queryset = Quiz.objects.all()
    permission_classes = (IsAuthenticated,)


class QuizTakerView(ModelViewSet):
    serializer_class = QuizTakerSerializer
    queryset = QuizTaker.objects.all()
    permission_classes = (IsAuthenticated,)


class QuestionView(ModelViewSet):
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()
    permission_classes = (IsAuthenticated,)
    # lookup_field = 'id'
    #
    # @action(detail=True, methods=["GET"])
    # def choices(self, request, id=None):
    #     question = self.get_object()
    #     answers = Answer.objects.filter(question=question)
    #     serializer = AnswerSerializer(answers, many=True)
    #     return Response(serializer.data, status=200)
    #
    # @action(detail=True, methods=["POST"])
    # def choice(self, request, id=None):
    #     question = self.get_object()
    #     data = request.data
    #     data["question"] = question.id
    #     serializer = AnswerSerializer(data=data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=201)
    #     return Response(serializer.erros, status=400)


class AnswerView(ModelViewSet):
    serializer_class = AnswerSerializer
    queryset = Answer.objects.all()
    permission_classes = (IsAuthenticated,)
