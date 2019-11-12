import { Component, OnInit, Input } from "@angular/core";
import {
  faBullhorn,
  faClock,
  faMapPin,
  faCalendarAlt,
  faHandHoldingHeart,
  faLandmark,
  faFileAlt
} from "@fortawesome/free-solid-svg-icons";
import { HostListener } from "@angular/core";
import { VolunteerService } from "../_services/volunteer.service";
import { SearchEvent } from "../_models/SearchEvent";
import { EventsService } from "@app/_services/events.service";

@Component({
  selector: "app-volunteer-event",
  templateUrl: "./volunteer-event.component.html",
  styleUrls: ["./volunteer-event.component.css"]
})
export class VolunteerEventComponent implements OnInit {
  @Input() event: SearchEvent;
  @Input() showOrg: boolean = true;

  token = JSON.parse(localStorage.getItem("currentUser")).access;

  //declaration of the icons
  faBullhorn = faBullhorn;
  faLandmark = faLandmark;
  faClock = faClock;
  faDescription = faFileAlt;
  faMapPin = faMapPin;
  faCalendarAlt = faCalendarAlt;
  faHandHoldingHeart = faHandHoldingHeart;
  signedup: boolean = false;

  constructor(
    private VolunteerService: VolunteerService,
    private es: EventsService
  ) {}

  ngOnInit() {
    this.checkSignup();
  }

  signUpEvent() {
    this.VolunteerService.signupEvents(this.token, this.event.id).subscribe(
      data => {
        console.log("Success", data);
        this.checkSignup();
      },
      error1 => {
        console.error(error1);
        alert(
          "There was a problem registering or unregistering for this event, please try again later."
        );
      }
    );
  }

  checkSignup() {
    this.es.checkSignUp(this.event.id).subscribe(
      data => {
        console.log(data);
        this.signedup = data["Signed-up"] == "true";
      },
      error1 => {
        console.error(error1);
      }
    );
  }
}
