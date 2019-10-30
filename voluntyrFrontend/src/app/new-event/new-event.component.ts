import { Component, OnInit } from "@angular/core";
import { Event } from "@app/_models/Event";
import { NgForm } from "@angular/forms";
import { OrganizationService } from "../_services/organization.service";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { ReturnStatement } from "@angular/compiler";
@Component({
  selector: "app-new-event",
  templateUrl: "./new-event.component.html",
  styleUrls: ["./new-event.component.css"]
})
export class NewEventComponent implements OnInit {
  public title;
  public location;
  public start_time;
  public end_time;
  public date;
  public description;
  public newEvent = new Event(
    this.title,
    this.start_time,
    this.end_time,
    this.date,
    this.location,
    this.description
  );

  createEvent() {
    var start_date = new Date(this.newEvent.start_time);
    var start_format =
      start_date.getUTCFullYear() +
      "/" +
      start_date.getUTCMonth() +
      "/" +
      start_date.getUTCDate();
    var end_date = new Date(this.newEvent.end_time);
    var end_format =
      end_date.getUTCFullYear() +
      "/" +
      end_date.getUTCMonth() +
      "/" +
      end_date.getUTCDate();
    var date_date = new Date(this.newEvent.date);
    var date_fomart =
      date_date.getUTCFullYear() +
      "/" +
      date_date.getUTCMonth() +
      "/" +
      date_date.getUTCDate();
    if (start_format !== date_fomart) {
      alert("The start date must have the same date as Date");
      return;
    }
    if (this.newEvent.start_time > this.newEvent.end_time) {
      alert("The end time must be later than start time");
      return;
    }
    this.OrganizationService.createNewEvent(this.newEvent).subscribe(resp => {
      console.log(resp);
      if (resp["status"] === 201) {
        alert("Event has been created");
        this.router.navigateByUrl("Organization").then(() => {
          window.location.reload();
        });
      } else if (resp["status"] === 400) {
        alert("Information is invalid, Try again");
      } else {
        alert("Something is wrong, Try again");
      }
    });
  }

  routeToDashBoard() {
    this.router.navigateByUrl("Organization");
  }
  constructor(
    private http: HttpClient,
    private OrganizationService: OrganizationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}
}
