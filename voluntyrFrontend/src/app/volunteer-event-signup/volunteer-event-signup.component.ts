import { Component, OnInit } from "@angular/core";
import { VolunteerService } from "../_services/volunteer.service";
import { Volunteer } from "../_models/Volunteer";
import { SearchEvent } from "../_models/SearchEvent";
import { faUser, faCalendarPlus } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-volunteer-event-signup",
  templateUrl: "./volunteer-event-signup.component.html",
  styleUrls: ["./volunteer-event-signup.component.css"]
})
export class VolunteerEventSignupComponent implements OnInit {
  constructor(private volunteerService: VolunteerService) {}

  faUser = faUser;
  faCalendarPlus = faCalendarPlus;
  start_time;
  end_time;
  public volunteer: Volunteer = new Volunteer();
  public events: SearchEvent[];

  public token = JSON.parse(localStorage.getItem("currentUser")).access;
  ngOnInit() {
    this.getUpcomingEvents();
  }
  public retrieveFilterEvents() {
    //this.end_time = this.searchForm.controls.endtime.value.toString();
    this.volunteerService
      .searchEvents(this.token, this.start_time, this.end_time)
      .subscribe(
        data => {
          this.events = data;
          console.log(data, "!!!");
        },
        error => {
          console.log(error);
        }
      );
  }
  private getUpcomingEvents() {
    this.volunteerService.getUpcomingEvents(this.token).subscribe(
      data => {
        this.events = data;
      },
      error => {
        console.error(error);
      }
    );
  }
}
