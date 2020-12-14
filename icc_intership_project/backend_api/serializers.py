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
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'tel', 'gender', 'password', 'my_admin', 'is_superuser', 'is_staff', 'is_active']

    # def create(self,validate_data):
    #     print("--------------------",validate_data)
    #     return


class CourseSerializer(serializers.ModelSerializer):
    admin = AdminSerializer
    #teacher = TeacherSerializer
    course_teacher = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = '__all__'

    def get_course_teacher(self, obj):
        return TeacherSerializer(obj.teacher).data


class ClassSerializer(serializers.ModelSerializer):
    admin = AdminSerializer
    all_courses = serializers.SerializerMethodField()
    teachers = serializers.SerializerMethodField()
    # teacher = TeacherSerializer

    class Meta:
        model = Class
        fields = '__all__'

    def get_all_courses(self, obj):
        return CourseSerializer(obj.courses.all(), many=True).data

    def get_teachers(self, obj):
        return TeacherSerializer(obj.teacher.all(), many=True).data


class StudentSerializer(serializers.ModelSerializer):
    # my_class = serializers.SerializerMethodField()
    student_class = serializers.SerializerMethodField()
    # courses = serializers.SerializerMethodField()

    class Meta:
        model = Student
        fields = '__all__'
        # fields = ['id', 'username', 'regis_number', 'first_name', 'last_name', 'tel', 'gender', 'password',
        #           'dateOfBirth', 'student_class', 'my_admin', 'is_superuser', 'is_staff', 'is_active']

    def get_student_class(self, obj):
        return ClassSerializer(obj.my_class).data

    # def get_my_class(self, obj):
    #     return ClassSerializer(obj.my_class).data

    # def create(self,validate_data):
    #     print("--------------------",validate_data)
    #     return

    # def get_my_class(self, obj):
    #     return ClassSerializer(obj.my_class).data
    #
    # def get_courses(self, obj):
    #     return CourseSerializer(obj.my_class.courses, many=True).data
    #     fields = ['first_name', 'last_name', 'username', 'evaluation', 'email', 'password', 'dateOfBirth',
    #               'regis_number', 'my_class', 'my_admin', 'courses', 'is_superuser', 'is_staff', 'is_active']


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


# class QuestionQuizSerializer(serializers.ModelSerializer):
#     answers = serializers.SerializerMethodField()
#
#     class Meta:
#         model = Question
#         fields = '__all__'
#
#     def get_answers(self, obj):
#         return AnswerQuestionSerializer(obj.answer_set.all(), many=True).data


# class AnswerQuestionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Answer
#         fields = '__all__'


class AnswerSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Answer
        fields = '__all__'

        read_only_fields = ('question',)


class QuestionSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    answers = AnswerSerializer(many=True)

    class Meta:
        model = Question
        fields = ['id', 'question_desc', 'quiz', 'answers']
        read_only_fields = ('quiz',)


class QuizSerializer(serializers.ModelSerializer):
    teacher = TeacherSerializer
    student = StudentSerializer

    questions = QuestionSerializer(many=True)

    class Meta:
        model = Quiz
        fields = ['id', 'entitled', 'course', 'req_time', 'created_at', 'classe', 'teacher', 'questions']

    def create(self, validated_data):
        questions = validated_data.pop('questions')
        quiz = Quiz.objects.create(**validated_data)
        for question in questions:
            answers = question.pop('answers')
            question = Question.objects.create(**question, quiz=quiz)
            for answer in answers:
                Answer.objects.create(**answer, question=question)
        return quiz


class QuizTakerSerializer(serializers.ModelSerializer):
    quiz = QuizSerializer
    student = StudentSerializer

    class Meta:
        model = QuizTaker
        fields = '__all__'
