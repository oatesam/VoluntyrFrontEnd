import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EmailInputComponent} from './email-input/email-input.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AccountsService} from './_services/accounts.service';
import {RegisterComponent} from './register/register.component';
import {ErrorInterceptor} from '@app/_helpers/error.interceptor';
import {JwtInterceptor} from '@app/_helpers/jwt.interceptor';
import {HidePasswordDirective} from './_helpers/hide-password.directive';
import {AlertComponent} from './alert/alert.component';
import {NgbDatepickerModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RecaptchaFormsModule, RecaptchaModule} from 'ng-recaptcha';

import {OrganizerDashboardComponent} from '@app/organizer-dashboard/organizer-dashboard.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FullCalendarModule} from '@fullcalendar/angular'; // full-calendar
import {CalendarComponent} from '@app/calendar/calendar.component';
import {IndividualEventSummaryComponent} from '@app/individual-event-summary/individual-event-summary.component';
import {VolunteerDashboardComponent} from '@app/volunteer-dashboard/volunteer-dashboard.component';
import {VolunteerEventComponent} from '@app/volunteer-event/volunteer-event.component';
import {VolunteerEventSignupComponent} from '@app/volunteer-event-signup/volunteer-event-signup.component';
import {NewEventComponent} from '@app/new-event/new-event.component';
import {MessageVolunteersComponent} from './message-volunteers/message-volunteers.component';
import {LoginwrapperComponent} from './loginwrapper/loginwrapper.component';
import {RegisterwrapperComponent} from './registerwrapper/registerwrapper.component';
import {NgxSpinnerModule} from 'ngx-spinner';

import {EditEventComponent} from './edit-event/edit-event.component';
import {LoginwrapperComponent} from '@app/loginwrapper/loginwrapper.component';
import {RegisterwrapperComponent} from '@app/registerwrapper/registerwrapper.component';


@NgModule({
  declarations: [
    AppComponent,
    OrganizerDashboardComponent,
    CalendarComponent,
    IndividualEventSummaryComponent,
    LoginComponent,
    AppComponent,
    LandingPageComponent,
    PageNotFoundComponent,
    NavBarComponent,
    EmailInputComponent,
    RegisterComponent,
    HidePasswordDirective,
    AlertComponent,
    RegisterComponent,
    VolunteerDashboardComponent,
    VolunteerEventComponent,
    VolunteerEventSignupComponent,
    NewEventComponent,
    MessageVolunteersComponent,
    NewEventComponent,
    LoginwrapperComponent,
    RegisterwrapperComponent,
    EditEventComponent,
    MessageVolunteersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule, // Full-Calendar
    HttpClientModule, // Httprequest
    FontAwesomeModule, // Font-Awesome
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgbDatepickerModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    NgxSpinnerModule,
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
export class AppModule {}
