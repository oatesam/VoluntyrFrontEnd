import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  faPhoneAlt,
  faEnvelopeOpen,
  faRibbon,
  faLandmark,
  faMapPin
} from "@fortawesome/free-solid-svg-icons";
import { OrganizationService } from "../_services/organization.service";
import { EventsService } from "../_services/events.service";
import { Observable } from "rxjs";
import { organization } from "../_models/organization";
import {Event} from '@app/_models/Event';
//TODO: add icons [organization, phone, email, ratings, motto]

@Component({
  selector: "app-organizer-dashboard",
  templateUrl: "./organizer-dashboard.component.html",
  styleUrls: ["./organizer-dashboard.component.css"]
})
export class OrganizerDashboardComponent implements OnInit {
  //Section of icon declaration
  faPhoneAlt = faPhoneAlt;
  faEnvelopeOpen = faEnvelopeOpen;
  faRibbon = faRibbon;
  faLandmark = faLandmark;
  faMapPin = faMapPin;
  //

  constructor(
    private http: HttpClient,
    private OrganizationService: OrganizationService,
    private EventService: EventsService
  ) {}
  //Initiate the varibales
  public org_lst: organization;
  public org_info;
  public event_lst: Event[];
  public calendar_event: [];
  //TODO: The API calls currently doesn't do anything due to django error
  ngOnInit() {
    //httprequests to gather data for display
    this.OrganizationService.getOrganizationInfo().subscribe(
      data => ((this.org_lst = data), (this.org_info = this.org_lst))
    );

    this.EventService.getEventInfo().subscribe(data => (this.event_lst = data));
  }
}
