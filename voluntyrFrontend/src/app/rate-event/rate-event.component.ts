import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SearchEvent} from '@app/_models/SearchEvent';
import {
  faBullhorn,
  faCalendarAlt,
  faClock,
  faLandmark,
  faMapPin,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import {VolunteerService} from '@app/_services/volunteer.service';
import {EventsService} from '@app/_services/events.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RatingPopupComponent} from '@app/rating-popup/rating-popup.component';

@Component({
  selector: 'app-rate-event',
  templateUrl: './rate-event.component.html',
  styleUrls: ['./rate-event.component.css']
})
export class RateEventComponent implements OnInit {
  @Input() event: SearchEvent;
  @Output() refresh = new EventEmitter<boolean>();

  token = JSON.parse(localStorage.getItem("currentUser")).access;

  faBullhorn = faBullhorn;
  faLandmark = faLandmark;
  faClock = faClock;
  faRating = faStar;
  faMapPin = faMapPin;
  faCalendarAlt = faCalendarAlt;

  constructor(
    private vs: VolunteerService,
    private es: EventsService,
    private ms: NgbModal
  ) {}

  ngOnInit() {

  }

  onVoteClick() {
    const modalRef = this.ms.open(RatingPopupComponent, { centered: true });
    modalRef.componentInstance.event = this.event;
    modalRef.result.finally(
      () => {
        this.refresh.emit(true);
      }
    )
  }


}
