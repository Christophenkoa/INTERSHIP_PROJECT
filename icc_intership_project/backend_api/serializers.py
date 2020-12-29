from .models import *
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = ['username', 'email', 'password', 'tel', 'is_superuser', 'is_staff', 'is_active']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        print('my validated data', validated_data)
        user = super(StudentSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.clear_password = validated_data['password']
        print('clear password: ', user.clear_password)
        user.save()
        return user


class TeacherSerializer(serializers.ModelSerializer):
    my_admin = AdminSerializer

    class Meta:
        model = Teacher
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'tel', 'gender',
                  'password', 'my_admin', 'is_superuser', 'is_staff', 'is_active']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        # print('my validated data', validated_data)
        # user = super(TeacherSerializer, self).create(validated_data)
        user = super().create(validated_data)
        user.set_password(validated_data['password'])
        user.clear_password = validated_data['password']
        # print('clear password: ', user.clear_password)
        user.save()
        return user

    # def create(self,validate_data):
    #     print("--------------------",validate_data)
    #     return


class CourseSerializer(serializers.ModelSerializer):
    admin = AdminSerializer
    course_teacher = serializers.SerializerMethodField()
    chapter_list = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = '__all__'

    def get_course_teacher(self, obj):
        return TeacherSerializer(obj.teacher).data

    def get_chapter_list(self, obj):
        return ChapterSerializer(obj.chapter_set.all(), many=True).data

    # def get_class_course(self, obj):
    #     return ClassSerializer(obj.)


# class CourseSerializer1(serializers.ModelSerializer):
#     class Meta:
#         model = Course
#         fields = '__all__'


class StudentSerializer1(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'username', 'regis_number', 'first_name', 'last_name', 'tel', 'gender', 'password',
                  'dateOfBirth', 'is_superuser', 'is_staff', 'is_active', 'my_class']


class ClassSerializer(serializers.ModelSerializer):
    admin = AdminSerializer
    all_courses = serializers.SerializerMethodField()
    teachers = serializers.SerializerMethodField()
    all_students = serializers.SerializerMethodField()

    class Meta:
        model = Class
        fields = ['id', 'level', 'class_number', 'option', 'serie', 'all_courses',
                  'teachers', 'all_students', 'courses', 'teacher']

    def get_all_courses(self, obj):
        # print(obj.courses.all())
        return CourseSerializer(obj.courses.all(), many=True).data

    def get_teachers(self, obj):
        # print(obj.teacher.all())
        return TeacherSerializer(obj.teacher.all(), many=True).data

    def get_all_students(self, obj):
        # print(obj.student_set.all())
        return StudentSerializer1(obj.student_set.all(), many=True).data


class StudentSerializer(serializers.ModelSerializer):
    # my_class = serializers.SerializerMethodField()

    student_class = serializers.SerializerMethodField()
    # courses = serializers.SerializerMethodField()

    class Meta:
        model = Student
        # fields = '__all__'
        fields = ['id', 'username', 'regis_number', 'first_name', 'last_name', 'tel', 'gender', 'password',
                  'dateOfBirth', 'my_class', 'student_class', 'my_admin', 'is_superuser', 'is_staff', 'is_active']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def get_student_class(self, obj):
        return ClassSerializer(obj.my_class).data

    def create(self, validated_data):
        print('my validated data', validated_data)
        user = super(StudentSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.clear_password = validated_data['password']
        print('clear password: ', user.clear_password)
        user.save()
        return user

    # def create(self,validate_data):
    #     print("--------------------",validate_data)
    #     return

    # def get_my_class(self, obj):
    #     return ClassSerializer(obj.my_class).data

    # def create(self,validate_data):
    #     print("--------------------",validate_data)
    #     return

    # def get_courses(self, obj):
    #     return CourseSerializer(obj.my_class.courses, many=True).data
    #     fields = ['first_name', 'last_name', 'username', 'evaluation', 'email', 'password', 'dateOfBirth',
    #               'regis_number', 'my_class', 'my_admin', 'courses', 'is_superuser', 'is_staff', 'is_active']


class EvaluationSerializer(serializers.ModelSerializer):
    course_note = serializers.SerializerMethodField()
    student_note = serializers.SerializerMethodField()

    class Meta:
        model = Evaluation
        fields = ['id', 'eval_date', 'note', 'sequence', 'student', 'course', 'course_note', 'student_note']

    def get_course_note(self, obj):
        return CourseSerializer(obj.course).data

    def get_student_note(self, obj):
        return StudentSerializer1(obj.student).data


class ChapterSerializer(serializers.ModelSerializer):
    # courseObj = serializers.SerializerMethodField()

    class Meta:
        model = Chapter
        fields = '__all__'

    # def get_courseObj(self, obj):
    #     return CourseSerializer1(obj.course).data


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
