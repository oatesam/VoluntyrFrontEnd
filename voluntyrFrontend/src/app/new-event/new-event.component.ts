import { Component, OnInit } from "@angular/core";
import { Event } from "@app/_models/Event";
import { NgForm } from "@angular/forms";
import { OrganizationService } from "../_services/organization.service";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
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
    if (this.start_time > this.end_time) {
      alert("The end date must be later than start time");
      return;
    }
    let resp = this.OrganizationService.createNewEvent(this.newEvent);
    alert(resp + "after call");

    this.router.navigateByUrl("organization").then(() => {
      window.location.reload();
    });
  }

  routeToDashBoard() {
    this.router.navigateByUrl("organization");
  }
  constructor(
    private http: HttpClient,
    private OrganizationService: OrganizationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}
}
