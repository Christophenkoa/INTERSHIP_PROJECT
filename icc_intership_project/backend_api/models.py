from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class User(models.Model):
    name = models.CharField(max_length=255)
    surname = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    tel = models.PositiveIntegerField()
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    gender = models.CharField(max_length=1)
    email = models.EmailField()

    class Meta:
        abstract = True


class Admin(models.Model):
    email = models.EmailField()
    password = models.CharField(max_length=255)
    tel = models.PositiveIntegerField()
    username = models.CharField(max_length=255)


class Teacher(User):
    is_staff = True
    username = models.CharField(max_length=255)
    admin = models.ForeignKey(Admin, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Course(models.Model):
    entitled = models.CharField(max_length=255)
    coefficient = models.IntegerField()
    admin = models.ForeignKey(Admin, on_delete=models.CASCADE)
    teacher = models.ManyToManyField(Teacher)


class Class(models.Model):
    level = models.CharField(max_length=255)
    class_number = models.IntegerField(null=True)
    option = models.CharField(max_length=10, null=True)
    serie = models.CharField(max_length=5, null=True)
    admin = models.ForeignKey(Admin, on_delete=models.CASCADE)
    courses = models.ManyToManyField(Course)
    teacher = models.ManyToManyField(Teacher)

    def __str__(self):
        return f"{self.entitled}  {self.class_number}  {self.option} {self.serie}"


class Student(User):
    dateOfBirth = models.DateField()
    regis_number = models.CharField(max_length=255)
    admin = models.ForeignKey(Admin, on_delete=models.CASCADE)
    my_class = models.ForeignKey(Class, on_delete=models.CASCADE)
    courses = models.ManyToManyField(Course, through='Evaluation', through_fields=('student', 'course'), )

    def __str__(self):
        return self.name


class Evaluation(models.Model):
    eval_date = models.DateField()
    note = models.DecimalField(decimal_places=4, max_digits=8)
    created_at = models.DateTimeField(auto_now_add=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="student")
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="course")

    def __str__(self):
        return self.note


class Chapter(models.Model):
    entitled = models.CharField(max_length=255)
    text = models.TextField()
    created_at = models.DateTimeField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE)

    def __str__(self):
        return self.entitled


class Quiz(models.Model):
    entitled = models.CharField(max_length=255)
    req_time = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    student = models.ManyToManyField(Student, through='QuizTaker',
                                     through_fields=('associated_quiz', 'associated_student'),)

    def __str__(self):
        return self.entitled


class QuizTaker(models.Model):
    score = models.PositiveIntegerField(default=0)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    associated_student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="ass_student")
    associated_quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name="ass_quiz")


class Question(models.Model):
    question_desc = models.TextField()
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)

    def __str__(self):
        return self.question_desc


class Answer(models.Model):
    answer = models.CharField(max_length=255)
    is_true = models.BooleanField(default=False)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)

    def __str__(self):
        return self.answer
