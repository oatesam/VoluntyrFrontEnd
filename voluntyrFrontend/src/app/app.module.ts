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

@NgModule({
  declarations: [
    AppComponent,
    OrganizerDashboardComponent,
    CalendarComponent,
    IndividualEventSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule, //Full-Calendar
    HttpClientModule, //Httprequest
    FontAwesomeModule //Font-Awesome
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
