import { Component, OnInit, Input } from "@angular/core";
import {
  faBullhorn,
  faClock,
  faMapPin,
  faCalendarAlt,
  faHandHoldingHeart,
  faLandmark,
  faFileAlt,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import { HostListener } from "@angular/core";
import { VolunteerService } from "../_services/volunteer.service";
import { SearchEvent } from "../_models/SearchEvent";
import { EventsService } from "@app/_services/events.service";
import {DialogService} from '@app/_services/dialog.service';
import {NgxSpinnerService} from 'ngx-spinner';

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
  faRating = faStar;
  faMapPin = faMapPin;
  faCalendarAlt = faCalendarAlt;
  faHandHoldingHeart = faHandHoldingHeart;
  signedup: boolean = false;

  constructor(
    private VolunteerService: VolunteerService,
    private es: EventsService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.checkSignup();
  }

  signUpEvent() {
    if (!this.signedup) {
      this.spinner.show();
    }
    this.VolunteerService.signupEvents(this.token, this.event.id).subscribe(
      data => {
        console.log("Success", data);
        if (!this.signedup) {
          this.spinner.hide();
        }
        this.checkSignup();
      },
      error1 => {
        console.error(error1);
        if (!this.signedup) {
          this.spinner.hide();
        }
        alert(
          "There was a problem registering or unregistering for this event, please try again later."
        );
      }
    );
  }

  checkSignup() {
    console.log("getting events");
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
