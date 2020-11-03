import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainNavComponent } from './main-nav/main-nav.component';



const routes: Routes = [
  {
    path : '',
    component : LoginComponent
  },
  {
    path : 'login',
    component: LoginComponent,
  },
  {
    path : 'navMenu',
    component: MainNavComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
