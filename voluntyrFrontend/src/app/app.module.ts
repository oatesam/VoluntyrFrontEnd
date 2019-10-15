import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EmailInputComponent } from './email-input/email-input.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AccountsService } from './_services/accounts.service';
import { RegisterComponent } from './register/register.component';
import {ErrorInterceptor} from '@app/_helpers/error.interceptor';
import {JwtInterceptor} from '@app/_helpers/jwt.interceptor';
import { HidePasswordDirective } from './_helpers/hide-password.directive';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppComponent,
    LandingPageComponent,
    PageNotFoundComponent,
    NavBarComponent,
    EmailInputComponent,
    RegisterComponent,
    HidePasswordDirective,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    HttpClientModule,
    AccountsService,
    ErrorInterceptor,
    JwtInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
