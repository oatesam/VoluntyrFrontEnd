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
// TODO: Should be rewritten using FormGroups and FormControls
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

  constructor(
    private http: HttpClient,
    private OrganizationService: OrganizationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}

  routeToDashBoard() {
    this.router.navigateByUrl("Organization");
  }

  createEvent() {
    var start_date = new Date(this.newEvent.start_time);
    var start_format =
      start_date.getFullYear() +
      "/" +
      start_date.getMonth() +
      "/" +
      start_date.getDate();
    var end_date = new Date(this.newEvent.end_time);
    var end_format =
      end_date.getFullYear() +
      "/" +
      end_date.getMonth() +
      "/" +
      end_date.getDate();
    var date_date = new Date(this.newEvent.date);
    var date_fomart =
      date_date.getFullYear() +
      "/" +
      date_date.getMonth() +
      "/" +
      date_date.getUTCDate();
    console.log("Dates: ", start_format, date_fomart);
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
}
