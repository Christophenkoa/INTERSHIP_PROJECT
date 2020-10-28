from .models import *
from rest_framework import serializers


class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = ['username', 'email', 'password', 'tel', 'is_superuser', 'is_staff', 'is_active']


class TeacherSerializer(serializers.ModelSerializer):
    my_admin = AdminSerializer

    class Meta:
        model = Teacher
        fields = ['first_name', 'last_name', 'username', 'email', 'password', 'gender',
                  'my_admin', 'is_superuser', 'is_staff', 'is_active']


class CourseSerializer(serializers.ModelSerializer):
    admin = AdminSerializer
    teacher = TeacherSerializer

    class Meta:
        model = Course
        fields = '__all__'


class ClassSerializer(serializers.ModelSerializer):
    admin = AdminSerializer
    course = CourseSerializer
    teacher = TeacherSerializer

    class Meta:
        model = Class
        fields = '__all__'


class StudentSerializer(serializers.ModelSerializer):
    my_class = serializers.SerializerMethodField()
    courses = serializers.SerializerMethodField()
    evaluation = serializers.SerializerMethodField()

    def get_my_class(self, obj):
        return ClassSerializer(obj.my_class).data

    def get_courses(self, obj):
        return CourseSerializer(obj.my_class.courses, many=True).data

    def get_evaluation(self, obj):
        return EvaluationSerializer(obj.note, many=True).data

    class Meta:
        model = Student
        fields = ['first_name', 'last_name', 'username', 'email', 'password', 'dateOfBirth',
                  'regis_number', 'my_class', 'my_admin', 'courses', 'is_superuser', 'is_staff', 'is_active']


class EvaluationSerializer(serializers.ModelSerializer):
    course = CourseSerializer
    student = StudentSerializer

    class Meta:
        model = Evaluation
        fields = '__all__'


class ChapterSerializer(serializers.ModelSerializer):
    course = CourseSerializer

    class Meta:
        model = Chapter
        fields = '__all__'


class QuizSerializer(serializers.ModelSerializer):
    teacher = TeacherSerializer
    student = StudentSerializer

    class Meta:
        model = Quiz
        fields = '__all__'


class QuizTakerSerializer(serializers.ModelSerializer):
    quiz = QuizSerializer
    student = StudentSerializer

    class Meta:
        model = QuizTaker
        fields = '__all__'


class QuestionSerializer(serializers.ModelSerializer):
    quiz = QuizSerializer

    class Meta:
        model = Question
        fields = '__all__'


class AnswerSerializer(serializers.ModelSerializer):
    question = QuestionSerializer

    class Meta:
        model = Answer
        fields = '__all__'
