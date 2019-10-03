import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome"; // Font-awesome
import { OrganizerDashboardComponent } from "./organizer-dashboard/organizer-dashboard.component";
import { FullCalendarModule } from "@fullcalendar/angular"; //full-calendar
import { CalendarComponent } from "./calendar/calendar.component";
import { IndividualEventSummaryComponent } from "./individual-event-summary/individual-event-summary.component";
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EmailInputComponent } from './email-input/email-input.component';
import { AccountsService } from './_services/accounts.service';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    OrganizerDashboardComponent,
    CalendarComponent,
    IndividualEventSummaryComponent
    LoginComponent,
    LandingPageComponent,
    PageNotFoundComponent,
    NavBarComponent,
    EmailInputComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule, //Full-Calendar
    HttpClientModule, //Httprequest
    FontAwesomeModule //Font-Awesome
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    HttpClientModule,
    AccountsService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
