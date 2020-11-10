import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { LoginComponent } from './login/login.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ClassInfoComponent } from './class-info/class-info.component';
import { CrudTeacherComponent } from './crud/teacher/crud-teacher/crud-teacher.component';
import { CrudStudentComponent } from './crud/student/crud-student/crud-student.component';
import { CuStudentComponent } from './crud/student/cu-student/cu-student.component';
import { CuTeacherComponent } from './crud/teacher/cu-teacher/cu-teacher.component';
import { MainNavComponent } from './main-nav/main-nav.component';

import {AuthService} from './services/auth.service';
import { MainSpaceComponent } from './main-space/main-space.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ClassInfoComponent,
    CrudTeacherComponent,
    CrudStudentComponent,
    CuStudentComponent,
    CuTeacherComponent,
    MainNavComponent,
    MainSpaceComponent
  ],
  entryComponents: [CuTeacherComponent, CuStudentComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    LayoutModule,
    MatBadgeModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTooltipModule,
    MatDatepickerModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
