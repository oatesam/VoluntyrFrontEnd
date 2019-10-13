import { Component, OnInit, Input } from "@angular/core";
import {
  faBullhorn,
  faClock,
  faMapPin,
  faCalendarAlt,
  faHandHoldingHeart
} from "@fortawesome/free-solid-svg-icons";
import { event } from "../organizer-dashboard/event";

//TODO: add icons [description ]
@Component({
  selector: "app-individual-event-summary",
  templateUrl: "./individual-event-summary.component.html",
  styleUrls: ["./individual-event-summary.component.css"]
})
export class IndividualEventSummaryComponent implements OnInit {
  @Input() event: event;
  //declaration of the icons
  faBullhorn = faBullhorn;
  faClock = faClock;
  faMapPin = faMapPin;
  faCalendarAlt = faCalendarAlt;
  faHandHoldingHeart = faHandHoldingHeart;

  constructor() {}

  ngOnInit() {}
}
