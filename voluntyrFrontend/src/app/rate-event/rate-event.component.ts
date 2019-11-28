import {Component, Input, OnInit} from '@angular/core';
import {SearchEvent} from '@app/_models/SearchEvent';
import {
  faBullhorn,
  faCalendarAlt,
  faClock,
  faFileAlt,
  faHandHoldingHeart,
  faLandmark,
  faMapPin,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import {VolunteerService} from '@app/_services/volunteer.service';
import {EventsService} from '@app/_services/events.service';

@Component({
  selector: 'app-rate-event',
  templateUrl: './rate-event.component.html',
  styleUrls: ['./rate-event.component.css']
})
export class RateEventComponent implements OnInit {
  @Input() event: SearchEvent;

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
    private vs: VolunteerService,
    private es: EventsService
  ) {}

  ngOnInit() {

  }


}
