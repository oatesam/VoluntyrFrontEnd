import { Component, OnInit, Input } from "@angular/core";
import {
  faBullhorn,
  faClock,
  faMapPin,
  faCalendarAlt,
  faHandHoldingHeart,
  faLandmark
} from "@fortawesome/free-solid-svg-icons";
import { HostListener } from "@angular/core";
import { VolunteerService } from "../_services/volunteer.service";
import { Event } from "../_models/Event";

@Component({
  selector: "app-volunteer-event",
  templateUrl: "./volunteer-event.component.html",
  styleUrls: ["./volunteer-event.component.css"]
})
export class VolunteerEventComponent implements OnInit {
  @Input() event: Event;
  @HostListener("click") onClick() {
    console.log("clicked!!!!", this.event.id);
    this.signUpEvent();
  }
  token = JSON.parse(localStorage.getItem("currentUser")).access;
  //declaration of the icons

  faBullhorn = faBullhorn;
  faLandmark = faLandmark;
  faClock = faClock;
  faMapPin = faMapPin;
  faCalendarAlt = faCalendarAlt;
  faHandHoldingHeart = faHandHoldingHeart;
  signUpEvent() {
    this.VolunteerService.signupEvents(this.token, this.event.id);
  }
  constructor(private VolunteerService: VolunteerService) {}

  ngOnInit() {}
}
