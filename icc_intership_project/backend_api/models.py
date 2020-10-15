from django.db import models


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


class Teacher(User):
    is_staff = True
    username = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Student(User):
    dateOfBirth = models.DateField()
    regis_number = models.CharField(max_length=255)

    def __str__(self):
        return self.name


# admin ???
class Admin(models.Model):
    email = models.EmailField()
    password = models.CharField(max_length=255)
    tel = models.PositiveIntegerField()
    username = models.CharField(max_length=255)


class Class(models.Model):
    level = models.CharField(max_length=255)
    class_number = models.IntegerField(null=True)
    option = models.CharField(max_length=10, null=True)
    serie = models.CharField(max_length=5, null=True)

    def __str__(self):
        return f"{self.entitled}  {self.class_number}  {self.option} {self.serie}"


class Course(models.Model):
    entitled = models.CharField(max_length=255)
    coefficient = models.IntegerField()


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

    def __str__(self):
        return self.entitled


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


class Evaluation(models.Model):
    eval_date = models.DateField()
    note = models.DecimalField()
    created_at = models.DateTimeField(auto_now_add=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="student")
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="course")

    def __str__(self):
        return self.note
