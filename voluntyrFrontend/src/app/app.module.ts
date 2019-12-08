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
import {NgxSpinnerModule} from 'ngx-spinner';
import {EmailInputWrapperComponent} from './email-input-wrapper/email-input-wrapper.component';
import {EditEventComponent} from './edit-event/edit-event.component';
import {LoginwrapperComponent} from '@app/loginwrapper/loginwrapper.component';
import {RegisterwrapperComponent} from '@app/registerwrapper/registerwrapper.component';
import { VolunteerOrganizationComponent } from './volunteer-organization/volunteer-organization.component';
import { DualauthComponent } from './dualauth/dualauth.component';
import { InvitePopupComponent } from './invite-popup/invite-popup.component';
import { CopyToClipboardDirective } from './_helpers/copy-to-clipboard.directive';
import { SingleEventWrapperComponent } from './single-event-wrapper/single-event-wrapper.component';
import { VolunteerInviteComponent } from './volunteer-invite/volunteer-invite.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RateEventsComponent } from './rate-events/rate-events.component';
import { RateEventComponent } from './rate-event/rate-event.component';
import { RatingPopupComponent } from './rating-popup/rating-popup.component';
import {SocialLoginModule, AuthServiceConfig, LoginOpt} from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";


let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("919398156388-sjt9psu2k5jvmsjtsh3v7hbi650offju.apps.googleusercontent.com")
  }
]);

export function provideConfig() {
  return config;
}

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
    LoginwrapperComponent,
    RegisterwrapperComponent,
    EmailInputWrapperComponent,
    EditEventComponent,
    VolunteerOrganizationComponent,
    DualauthComponent,
    InvitePopupComponent,
    CopyToClipboardDirective,
    SingleEventWrapperComponent,
    VolunteerInviteComponent,
    RateEventsComponent,
    RateEventComponent,
    RatingPopupComponent,
    RecoverPasswordComponent,
    ResetPasswordComponent,
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
    SocialLoginModule
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
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [
    AppComponent,
  ],
  entryComponents: [
    InvitePopupComponent,
    RatingPopupComponent,
  ]
})
export class AppModule {}
