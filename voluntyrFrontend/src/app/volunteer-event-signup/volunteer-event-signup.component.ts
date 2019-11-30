import { Component, OnInit } from "@angular/core";
import { VolunteerService } from "../_services/volunteer.service";
import { Volunteer } from "../_models/Volunteer";
import { SearchEvent } from "../_models/SearchEvent";
import { faUser, faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-volunteer-event-signup",
  templateUrl: "./volunteer-event-signup.component.html",
  styleUrls: ["./volunteer-event-signup.component.css"]
})
export class VolunteerEventSignupComponent implements OnInit {
  constructor(private volunteerService: VolunteerService) {}

  faUser = faUser;
  faCalendarPlus = faCalendarPlus;
  displayEmptyMsg = false;
  displayEventResult = true;
  start_time;
  end_time;
  title;
  keyword;
  location;
  orgName;
  public volunteer: Volunteer = new Volunteer();
  public events: SearchEvent[];
  searchForm = new FormGroup({
    startime: new FormControl(""),
    endtime: new FormControl(""),
    title: new FormControl(""),
    keyword: new FormControl(""),
    location: new FormControl(""),
    orgName: new FormControl("")
  });

  public token = JSON.parse(localStorage.getItem("currentUser")).access;
  ngOnInit() {
    this.getUpcomingEvents();
  }
  //search params: keyword in title description, location, organiztion name
  public retrieveSearchEvents() {
    this.start_time = this.searchForm.controls.startime.value;
    this.end_time = this.searchForm.controls.endtime.value;
    this.title = this.searchForm.controls.title.value;
    this.keyword = this.searchForm.controls.keyword.value;
    this.location = this.searchForm.controls.location.value;
    this.orgName = this.searchForm.controls.orgName.value;
    if (this.dateInputChecker(this.start_time, this.end_time) === true) {
      alert("The end time must be later than start time");
      return;
    }
    this.volunteerService
      .searchEvents(
        this.token,
        this.start_time,
        this.end_time,
        this.title,
        this.keyword,
        this.location,
        this.orgName
      )
      .subscribe(
        data => {
          this.events = data;
          console.log(data, "!!!");
          this.eventResultChecker();
          console.log(this.events);
        },
        error => {
          console.log(error);
        }
      );
  }
  public dateInputChecker(start_time, end_time) {
    if (this.end_time !== "" && this.start_time !== "") {
      if (this.end_time < this.start_time) {
        return true;
      }
    }
  }
  public eventResultChecker() {
    if (this.events.length == 0 || this.events === undefined) {
      this.displayEmptyMsg = true;
      this.displayEventResult = false;
    } else {
      this.displayEmptyMsg = false;
      this.displayEventResult = true;
    }
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
