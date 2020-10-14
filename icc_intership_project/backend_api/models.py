from django.db import models


# Create your models here.

class User(models.Model):
    name = models.CharField(max_length=255)
    surname = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    tel = models.IntegerField()
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    gender = models.CharField(max_length=1)
    email = models.EmailField()

    class Meta:
        abstract = True


class Teacher(User):
    is_staff = True
    username = models.CharField(max_length=255)
    #


class Student(User):
    dateOfBirth = models.DateField()
    regis_number = models.CharField(max_length=255)


# admin ???

class Class(models.Model):
    level = models.CharField(max_length=255)
    class_number = models.IntegerField()
    option = models.CharField(max_length=10)
    serie = models.CharField(max_length=5)


class Course(models.Model):
    entitled = models.CharField(max_length=255)
    coefficient = models.IntegerField()


class Chapter(models.Model):
    entitled = models.CharField(max_length=255)
    text = models.TextField()


class Quiz(models.Model):
    entitled = models.CharField(max_length=255)
    time = models.DateTimeField()


class Answer(models.Model):
    answer = models.CharField(max_length=255)
    is_true = models.BooleanField(default=False)


class Question(models.Model):
    question_desc = models.TextField()


class Evaluation(models.Model):
    eval_date = models.DateField()
    note = models.DecimalField()
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
