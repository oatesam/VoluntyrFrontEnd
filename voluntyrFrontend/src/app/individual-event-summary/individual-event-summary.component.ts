import { Component, OnInit, Input, HostListener} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  faBullhorn,
  faClock,
  faMapPin,
  faCalendarAlt,
  faHandHoldingHeart
} from "@fortawesome/free-solid-svg-icons";
import {Event} from '@app/_models/Event';
import { OrganizationService } from '../_services/organization.service';

//TODO: add icons [description ]
@Component({
  selector: "app-individual-event-summary",
  templateUrl: "./individual-event-summary.component.html",
  styleUrls: ["./individual-event-summary.component.css"]
})
export class IndividualEventSummaryComponent implements OnInit {
  //declaration of the icons
  faBullhorn = faBullhorn;
  faClock = faClock;
  faMapPin = faMapPin;
  faCalendarAlt = faCalendarAlt;
  faHandHoldingHeart = faHandHoldingHeart;
  @Input() event: Event;
  @HostListener('click') onClick() {
    this.getEventDetails();
  }
  getEventDetails() {
    console.log('clicked', this.event.id);
    // this.OrganizationService.editEvent(this.event.id);
    this.router.navigateByUrl("Organization/editEvent/" + this.event.id);
  }
  // tslint:disable-next-line:no-shadowed-variable
  constructor(private OrganizationService: OrganizationService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {}
}
