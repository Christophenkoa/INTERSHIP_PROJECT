import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import {MatAutocompleteModule, MatNativeDateModule, MatRadioModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { LoginComponent } from './login/login.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ClassInfoComponent } from './class-info/class-info.component';
import { CrudTeacherComponent } from './crud/teacher/crud-teacher/crud-teacher.component';
import { CrudStudentComponent } from './crud/student/crud-student/crud-student.component';
import { CuStudentComponent } from './crud/student/cu-student/cu-student.component';
import { CuTeacherComponent } from './crud/teacher/cu-teacher/cu-teacher.component';
import { MainNavComponent } from './main-nav/main-nav.component';

/*CKE Editor import*/
import { CKEditorModule } from 'ng2-ckeditor';


import {AuthService} from './services/auth.service';

import { MainSpaceComponent } from './main-space/main-space.component';

import { AddNoteComponent } from './crud/add-note/add-note.component';
import { CourseEditorComponent } from './course-editor/course-editor.component';
import { NoteClassComponent } from './note-classe/note-class.component';
import { CuClassComponent } from './crud/cu-class/cu-class.component';
import { ClassViewComponent } from './class-view/class-view.component';

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
    MainSpaceComponent,
    AddNoteComponent,
    CourseEditorComponent,
    NoteClassComponent,
    CuClassComponent,
    ClassViewComponent,
  ],
  entryComponents: [CuTeacherComponent, CuStudentComponent, CuClassComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatSelectModule,
    CKEditorModule,
    MatSnackBarModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
