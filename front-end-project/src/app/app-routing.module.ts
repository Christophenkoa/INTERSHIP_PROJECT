import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ClassInfoComponent } from './class-info/class-info.component';
import {MainNavComponent} from './main-nav/main-nav.component';
import {CourseEditorComponent} from './course-editor/course-editor.component';
import {ClassViewComponent} from './class-view/class-view.component';



const routes: Routes = [
  {
    path : '',
    component : ClassInfoComponent,
  },
  {
    path : 'class-view',
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
    path : 'navMenu/set-course',
    component: CourseEditorComponent,
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
