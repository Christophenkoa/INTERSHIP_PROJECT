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
    path : 'navMenu/class-info',
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
    path : 'navMenu/quiz',
    component : QuizzesComponent,
  },
  {
    path : 'navMenu/course-list',
    component : CoursesListComponent,
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
