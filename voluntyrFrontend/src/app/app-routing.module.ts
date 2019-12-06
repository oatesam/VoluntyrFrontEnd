import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {OrganizerDashboardComponent} from './organizer-dashboard/organizer-dashboard.component';
import {VolunteerDashboardComponent} from './volunteer-dashboard/volunteer-dashboard.component';
import {VolunteerEventSignupComponent} from '@app/volunteer-event-signup/volunteer-event-signup.component';
import {NewEventComponent} from './new-event/new-event.component';
import {MessageVolunteersComponent} from '@app/message-volunteers/message-volunteers.component';
import {LoginwrapperComponent} from '@app/loginwrapper/loginwrapper.component';
import {RegisterwrapperComponent} from '@app/registerwrapper/registerwrapper.component';
import {RoleGuardService} from './_helpers/role-guard.service';
import {EditEventComponent} from '@app/edit-event/edit-event.component';
import {CanDeactivateGuard} from '@app/_helpers/can-deactivate.guard';
import {EmailInputWrapperComponent} from '@app/email-input-wrapper/email-input-wrapper.component';
import {VolunteerOrganizationComponent} from '@app/volunteer-organization/volunteer-organization.component';
import {DualauthComponent} from "@app/dualauth/dualauth.component";
import {SingleEventWrapperComponent} from '@app/single-event-wrapper/single-event-wrapper.component';
import {VolunteerInviteComponent} from '@app/volunteer-invite/volunteer-invite.component';
import {AuthGuard} from '@app/_helpers/auth.guard';
import {RecoverPasswordComponent} from "@app/recover-password/recover-password.component";
import {ResetPasswordComponent} from "@app/reset-password/reset-password.component";
import {RateEventsComponent} from '@app/rate-events/rate-events.component';
import {EmailInputComponent} from "@app/email-input/email-input.component";

const routes: Routes = [
  { path: "", component: LandingPageComponent },
  // This is an example of how to add an AuthGuard to a protected route
  // basically the same as below, just replace 'ExampleComponent'
  // {path: '', component: ExampleComponent, canActivate: [AuthGuard]},
  // will uncomment the above line once AuthGuard is integrated
  { path: "email-input", component: EmailInputComponent },
  { path: "login", component: LoginwrapperComponent },
  { path: "register", component: RegisterwrapperComponent },
  {
    path: 'DualAuth',
    component: DualauthComponent
  },
  { path: "recoverpassword", component: RecoverPasswordComponent},
  {
    path: "recoverpassword/:id",
    component: ResetPasswordComponent
  },
  {
    path: "Events",
    component: VolunteerEventSignupComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRole: "volunteer"
    }
  },
  {
    path: "Organization",
    component: OrganizerDashboardComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRole: "organization"
    }
  },
  {
    path: "Organization/newEvent",
    component: NewEventComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRole: "organization"
    }
  },
  {
    path: "Organization/:id",
    component: VolunteerOrganizationComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRole: "volunteer"
    }
  },
  {
    path: "Volunteer",
    component: VolunteerDashboardComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRole: "volunteer"
    }
  },
  {
    path: "message/:eventid",
    component: MessageVolunteersComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRole: "organization"
    },
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: "Organization/editEvent/:id",
    component: EditEventComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRole: "organization"
    },
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: "Event/:id",
    component: SingleEventWrapperComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRole: "volunteer"
    }
  },
  {
    path: "Invite/:invite",
    component: VolunteerInviteComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRole: "volunteer"
    }
  },
  {
    path: "Ratings",
    component: RateEventsComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRole: "volunteer"
    }
  },
  // PageNotFound should always be last in routing, otherwise it will overtake others
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: "reload"
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
