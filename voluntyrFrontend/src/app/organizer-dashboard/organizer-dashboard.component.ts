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
import { organization } from "../_models/organization";
import { Event } from '@app/_models/Event';
import {SearchEvent} from '@app/_models/SearchEvent';
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
    private OrganizationService: OrganizationService
  ) {}

  //Initiate the variables
  public org_info: organization = new organization();
  public event_lst: SearchEvent[];
  public calendar_event: SearchEvent[];

  ngOnInit() {
    //httprequests to gather data for display
    this.OrganizationService.getOrganizationInfo().subscribe(
      data => {
        this.org_info = data;
      },
      error1 => {
        console.error(error1);
      }
    );

    this.OrganizationService.getEvents().subscribe(
      data => {
        this.event_lst = data;
      });
  }
}
