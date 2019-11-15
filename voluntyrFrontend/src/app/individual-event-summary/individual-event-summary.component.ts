import { Component, OnInit, Input, HostListener} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  faBullhorn,
  faClock,
  faMapPin,
  faCalendarAlt,
  faHandHoldingHeart, faLandmark, faUserFriends
} from '@fortawesome/free-solid-svg-icons';
import { OrganizationService } from '../_services/organization.service';
import {EventsService} from '@app/_services/events.service';
import * as decode from "jwt-decode";
import {SearchEvent} from '@app/_models/SearchEvent';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {InvitePopupComponent} from '@app/invite-popup/invite-popup.component';

@Component({
  selector: "app-individual-event-summary",
  templateUrl: "./individual-event-summary.component.html",
  styleUrls: ["./individual-event-summary.component.css"]
})
export class IndividualEventSummaryComponent implements OnInit {
  @Input() event: SearchEvent;
  //declaration of the icons
  faBullhorn = faBullhorn;
  faClock = faClock;
  faMapPin = faMapPin;
  faCalendarAlt = faCalendarAlt;
  faHandHoldingHeart = faHandHoldingHeart;
  faLandmark = faLandmark;
  faUsers = faUserFriends;

  isOrg: boolean = false;
  volunteers;
  numberOfVols;

  getEventDetails() {
    this.router.navigateByUrl("Organization/editEvent/" + this.event.id);
  }
  // tslint:disable-next-line:no-shadowed-variable
  constructor(private OrganizationService: OrganizationService,
              private router: Router,
              private route: ActivatedRoute,
              private es: EventsService,
              private ms: NgbModal) {}

  ngOnInit() {
    this.getScope();
  }

  getScope() {
    const token = JSON.parse(localStorage.getItem("currentUser")).access;
    const tokenScope = decode(token);
    if (tokenScope["scope"] == "organization") {
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

  openInvites() {
    console.log("Oepeninvites()");
    // TODO: Story-59; When colors figured out, style popup: https://ng-bootstrap.github.io/#/components/modal/examples#options
    const modalRef = this.ms.open(InvitePopupComponent, { centered: true });
    modalRef.componentInstance.isOrg = this.isOrg;
    modalRef.componentInstance.eventId = this.event.id;
  }
}
