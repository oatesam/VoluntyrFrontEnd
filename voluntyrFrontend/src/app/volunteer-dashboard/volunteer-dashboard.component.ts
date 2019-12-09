import { Component, OnInit } from "@angular/core";
import { VolunteerService } from "../_services/volunteer.service";
import { Volunteer } from "../_models/Volunteer";
import { faUser, faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { Router, ActivatedRoute } from "@angular/router";
import {SearchEvent} from '@app/_models/SearchEvent';

@Component({
  selector: "app-volunteer-dashboard",
  templateUrl: "./volunteer-dashboard.component.html",
  styleUrls: ["./volunteer-dashboard.component.css"]
})
export class VolunteerDashboardComponent implements OnInit {
  constructor(
    private VolunteerService: VolunteerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  faUser = faUser;
  faCalendarPlus = faCalendarPlus;

  public volunteer: Volunteer = new Volunteer();
  public events: SearchEvent[];

  public token = JSON.parse(localStorage.getItem("currentUser")).access;

  ngOnInit() {
    this.getDetails();
    this.getEvents();
  }

  public getDetails() {
    this.VolunteerService.getDetails(this.token).subscribe(
      data => {
        this.volunteer = data;
      },
      error => {
        console.error(error);
      }
    );
  }

  public routeToEvents() {
    this.router.navigateByUrl("Events");
  }

  public routeToRatings() {
    this.router.navigateByUrl("Ratings");
  }

  public getEvents() {
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
