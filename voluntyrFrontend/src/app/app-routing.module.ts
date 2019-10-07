<<<<<<< HEAD
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { EmailInputComponent } from "./email-input/email-input.component";
import { OrganizerDashboardComponent } from "./organizer-dashboard/organizer-dashboard.component";
import { AuthGuard } from "./_helpers/auth.guard";
import { VolunteerDashboardComponent } from './volunteer-dashboard/volunteer-dashboard.component';

const routes: Routes = [
  { path: "", component: LandingPageComponent },
  // This is an example of how to add an AuthGuard to a protected route
  // basically the same as below, just replace 'ExampleComponent'
  // {path: '', component: ExampleComponent, canActivate: [AuthGuard]},
  // will uncomment the above line once AuthGuard is integrated
  { path: "email-input", component: EmailInputComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "Organization",
    component: OrganizerDashboardComponent,
    canActivate: [AuthGuard]
  },
  {path: 'dashboard/volunteer', component: VolunteerDashboardComponent},
  // PageNotFound should always be last in routing, otherwise it will overtake others
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
