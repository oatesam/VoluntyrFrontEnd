import { Component, OnInit } from "@angular/core";
import { VolunteerService } from "../_services/volunteer.service";
import { Volunteer } from "../_helpers/Volunteer";
import { Event } from "../_helpers/Event";
import { faUser, faCalendarPlus } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-volunteer-dashboard",
  templateUrl: "./volunteer-dashboard.component.html",
  styleUrls: ["./volunteer-dashboard.component.css"]
})
export class VolunteerDashboardComponent implements OnInit {
  constructor(private VolunteerService: VolunteerService) {}
  faUser = faUser;
  faCalendarPlus = faCalendarPlus;

  public volunteer: Volunteer = new Volunteer();
  public events: Event[];

  public token = JSON.parse(localStorage.getItem("currentUser")).access;

  ngOnInit() {
    this.getDetails();
    this.getEvents();
  }

  private getDetails() {
    this.VolunteerService.getDetails(this.token).subscribe(
      data => {
        this.volunteer = data;
      },
      error => {
        console.error(error);
      }
    );
  }

  private getEvents() {
    this.VolunteerService.getEvents(this.token).subscribe(
      data => {
        this.events = data;
      },
      error => {
        console.error(error);
      }
    );
  }
}
