import { Component, OnInit, Input } from "@angular/core";
import {
  faBullhorn,
  faClock,
  faMapPin,
  faCalendarAlt,
  faHandHoldingHeart, faLandmark, faUserFriends
} from '@fortawesome/free-solid-svg-icons';
import {Event} from '@app/_models/Event';
import {EventsService} from '@app/_services/events.service';
import * as decode from "jwt-decode";

@Component({
  selector: "app-individual-event-summary",
  templateUrl: "./individual-event-summary.component.html",
  styleUrls: ["./individual-event-summary.component.css"]
})
export class IndividualEventSummaryComponent implements OnInit {
  @Input() event: Event;
  //declaration of the icons
  faBullhorn = faBullhorn;
  faClock = faClock;
  faMapPin = faMapPin;
  faCalendarAlt = faCalendarAlt;
  faHandHoldingHeart = faHandHoldingHeart;
  faLandmark = faLandmark;
  faUsers = faUserFriends

  isOrg: boolean = false;
  volunteers;
  numberOfVols;

  constructor(private es: EventsService) {}

  ngOnInit() {
    this.getScope();
  }

  getScope() {
    const token = JSON.parse(localStorage.getItem("currentUser")).access;
    const tokenScope = decode(token);
    if (tokenScope.scope == "organization") {
      this.isOrg = true;
      this.es.getVolunteers(this.event.id).subscribe(
        data => {
          this.numberOfVols = data["number"];
        },
        error1 => {
          console.error(error1);
          this.isOrg = false;
        }
      )
    }
  }
}
