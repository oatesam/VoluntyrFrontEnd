import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {EmailInputComponent} from "./email-input/email-input.component";


const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'email-input', component: EmailInputComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  // PageNotFound should always be last in routing, otherwise it will overtake others
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
