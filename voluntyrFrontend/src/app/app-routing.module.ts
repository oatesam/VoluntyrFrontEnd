import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { EmailInputComponent } from "./email-input/email-input.component";
import { OrganizerDashboardComponent } from "./organizer-dashboard/organizer-dashboard.component";
import { AuthGuard } from "./_helpers/auth.guard";
import { VolunteerDashboardComponent } from "./volunteer-dashboard/volunteer-dashboard.component";
import { VolunteerEventSignupComponent } from "@app/volunteer-event-signup/volunteer-event-signup.component";
import { NewEventComponent } from "./new-event/new-event.component";
import {MessageVolunteersComponent} from '@app/message-volunteers/message-volunteers.component';
import {LoginwrapperComponent} from "@app/loginwrapper/loginwrapper.component";
import {RegisterwrapperComponent} from "@app/registerwrapper/registerwrapper.component";
import { RoleGuardService } from "./_helpers/role-guard.service";
import {EditEventComponent} from "@app/edit-event/edit-event.component";
import {CanDeactivateGuard} from "@app/_helpers/can-deactivate.guard";

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
    path: "Volunteer",
    component: VolunteerDashboardComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRole: "volunteer"
    }
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
    path: "test",
    component: MessageVolunteersComponent
  }, // TODO Remove this route; testing purposes only

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
