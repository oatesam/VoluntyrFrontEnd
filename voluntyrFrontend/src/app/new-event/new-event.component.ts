import { Component, OnInit } from "@angular/core";
import { event } from "../organizer-dashboard/event";
import { NgForm } from "@angular/forms";
import { OrganizationService } from "../_helpers/organization.service";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-new-event",
  templateUrl: "./new-event.component.html",
  styleUrls: ["./new-event.component.css"]
})
export class NewEventComponent implements OnInit {
  private title;
  private location;
  private start_time;
  private end_time;
  private date;
  private description;
  private newEvent = new event(
    this.title,
    this.start_time,
    this.end_time,
    this.date,
    this.location,
    this.description
  );

  createEvent() {
    let resp = this.OrganizationService.createNewEvent(this.newEvent);
    alert("New Event has been created");

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
