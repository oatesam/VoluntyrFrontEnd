import { Component, OnInit, Input } from "@angular/core";
import {
  faBullhorn,
  faClock,
  faMapPin,
  faCalendarAlt,
  faHandHoldingHeart,
  faLandmark
} from "@fortawesome/free-solid-svg-icons";
import { Event } from "../_helpers/Event";

@Component({
  selector: "app-volunteer-event",
  templateUrl: "./volunteer-event.component.html",
  styleUrls: ["./volunteer-event.component.css"]
})
export class VolunteerEventComponent implements OnInit {
  @Input() event: Event;
  //declaration of the icons
  faBullhorn = faBullhorn;
  faLandmark = faLandmark;
  faClock = faClock;
  faMapPin = faMapPin;
  faCalendarAlt = faCalendarAlt;
  faHandHoldingHeart = faHandHoldingHeart;
  constructor() {}

  ngOnInit() {}
}
