import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ClassInfoComponent } from './class-info/class-info.component';
import {MainNavComponent} from './main-nav/main-nav.component';
import {CourseEditorComponent} from './course-editor/course-editor.component';
import {ClassViewComponent} from './class-view/class-view.component';
import { AddNoteComponent } from './crud/add-note/add-note.component';
import { CuClassComponent } from './crud/cu-class/cu-class.component';
import { MainSpaceComponent } from './main-space/main-space.component';
import {CrudStudentComponent} from './crud/student/crud-student/crud-student.component';
import {CrudTeacherComponent} from './crud/teacher/crud-teacher/crud-teacher.component';
import {HomeComponent} from './home/home.component';
import { CourseCrudComponent } from './crud/course-crud/course-crud.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import {QuizzesComponent} from './quizzes/quizzes.component';
import { NoteClassComponent } from './note-classe/note-class.component';
import {BuildQuizComponent} from './quizzes/build-quiz/build-quiz.component';
import {QuizListComponent} from './quizzes/quiz-list/quiz-list.component';
import {QuizDetailComponent} from './quizzes/quiz-detail/quiz-detail.component';
import {DisplayCourseComponent} from './display-course/display-course.component';
import {StudentHomeComponent} from './home/student-home/student-home.component';


const routes: Routes = [
  {
    path : '',
    component : HomeComponent,
  },
  {
    path : 'navMenu/class-view',
    component : ClassViewComponent,
  },
  {
    path : 'login',
    component: LoginComponent,
  },
  {
    path : 'navMenu',
    component: MainNavComponent,
  },
  {
    path : 'student',
    component: StudentHomeComponent,
  },
  {
    path : 'navMenu/class-info/:id',
    component: ClassInfoComponent,
  },
  {
    path : 'navMenu/add-note',
    component: CourseEditorComponent,
  },
  {
    path : 'navMenu/add-mark',
    component: AddNoteComponent,
  },
  {
    path : 'navMenu/add-class',
    component: CuClassComponent,
  },
  {
    path : 'navMenu/class-view',
    component: MainSpaceComponent,
  },
  {
    path : 'navMenu/student',
    component: CrudStudentComponent,
  },
  {
    path : 'navMenu/teacher',
    component: CrudTeacherComponent,
  },
  {
    path : 'navMenu/add-course',
    component: CourseCrudComponent,
  },
  {
    path : 'course-display',
    component: DisplayCourseComponent,
  },
  {
    path : 'navMenu/quiz',
    component : QuizzesComponent,
  },
{
  path : 'navMenu/course-list',
  component: CoursesListComponent,
},
{
    path : 'quiz',
    component : QuizzesComponent,
  },
  {
    path : 'quiz/create',
    component : BuildQuizComponent,
  },
  {
    path : 'quiz/list',
    component : QuizListComponent,
  },
  {
    path : 'quiz/participate',
    component : QuizDetailComponent,
  },
  {
    path: '**',
    redirectTo: 'navMenu/class-info',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
