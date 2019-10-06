import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailInputComponent } from './email-input/email-input.component';
import { HttpClientModule } from '@angular/common/http';
import { AccountsService } from './_helpers/accounts.service';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppComponent,
    LandingPageComponent,
    PageNotFoundComponent,
    NavBarComponent,
    EmailInputComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [HttpClientModule, AccountsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
