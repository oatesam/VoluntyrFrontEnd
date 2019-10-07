import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { VolunteerDashboardComponent } from './volunteer-dashboard/volunteer-dashboard.component';


const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'dashboard/volunteer', component: VolunteerDashboardComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
