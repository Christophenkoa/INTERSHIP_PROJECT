# Generated by Django 3.1.2 on 2020-12-02 14:02

import django.contrib.auth.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Admin',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='auth.user')),
                ('tel', models.PositiveIntegerField()),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            bases=('auth.user',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Class',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('level', models.CharField(max_length=255)),
                ('class_number', models.IntegerField(null=True)),
                ('option', models.CharField(max_length=10, null=True)),
                ('serie', models.CharField(max_length=5, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('entitled', models.CharField(max_length=255)),
                ('coefficient', models.IntegerField()),
                ('my_admin', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend_api.admin')),
            ],
        ),
        migrations.CreateModel(
            name='Evaluation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('eval_date', models.DateField()),
                ('note', models.DecimalField(decimal_places=4, max_digits=8)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='course', to='backend_api.course')),
            ],
        ),
        migrations.CreateModel(
            name='Quiz',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('entitled', models.CharField(max_length=255)),
                ('course', models.CharField(max_length=255)),
                ('req_time', models.DateTimeField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('classe', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend_api.class')),
            ],
        ),
        migrations.CreateModel(
            name='Teacher',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='auth.user')),
                ('tel', models.PositiveIntegerField()),
                ('gender', models.CharField(max_length=2)),
                ('my_admin', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='backend_api.admin')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            bases=('auth.user',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='auth.user')),
                ('dateOfBirth', models.DateField()),
                ('regis_number', models.CharField(max_length=255)),
                ('courses', models.ManyToManyField(through='backend_api.Evaluation', to='backend_api.Course')),
                ('my_admin', models.ForeignKey(default=2, on_delete=django.db.models.deletion.CASCADE, to='backend_api.admin')),
                ('my_class', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend_api.class')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            bases=('auth.user',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='QuizTaker',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('score', models.PositiveIntegerField(default=0)),
                ('start_time', models.DateTimeField()),
                ('end_time', models.DateTimeField()),
                ('associated_quiz', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ass_quiz', to='backend_api.quiz')),
                ('associated_student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ass_student', to='backend_api.student')),
            ],
        ),
        migrations.AddField(
            model_name='quiz',
            name='student',
            field=models.ManyToManyField(through='backend_api.QuizTaker', to='backend_api.Student'),
        ),
        migrations.AddField(
            model_name='quiz',
            name='teacher',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend_api.teacher'),
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question_desc', models.TextField()),
                ('quiz', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend_api.quiz')),
            ],
        ),
        migrations.AddField(
            model_name='evaluation',
            name='student',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='student', to='backend_api.student'),
        ),
        migrations.AddField(
            model_name='course',
            name='teacher',
            field=models.ManyToManyField(blank=True, to='backend_api.Teacher'),
        ),
        migrations.AddField(
            model_name='class',
            name='courses',
            field=models.ManyToManyField(blank=True, to='backend_api.Course'),
        ),
        migrations.AddField(
            model_name='class',
            name='my_admin',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend_api.admin'),
        ),
        migrations.AddField(
            model_name='class',
            name='teacher',
            field=models.ManyToManyField(blank=True, to='backend_api.Teacher'),
        ),
        migrations.CreateModel(
            name='Chapter',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('entitled', models.CharField(max_length=255)),
                ('text', models.TextField()),
                ('created_at', models.DateTimeField()),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend_api.course')),
            ],
        ),
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('answer', models.CharField(max_length=255)),
                ('is_true', models.BooleanField(default=False)),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend_api.question')),
            ],
        ),
    ]
