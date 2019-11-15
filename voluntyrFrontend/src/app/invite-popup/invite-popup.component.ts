import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {EventsService} from '@app/_services/events.service';

@Component({
  selector: 'app-invite-popup',
  templateUrl: './invite-popup.component.html',
  styleUrls: ['./invite-popup.component.css']
})
export class InvitePopupComponent implements OnInit {

  @Input() isOrg;
  @Input() eventId;
  inviteCode: string;

  constructor(public activeModal: NgbActiveModal,
              private es: EventsService) { }

  ngOnInit() {
    this.getInviteLink();
  }

  getInviteLink() {
    this.es.getInviteCode(this.eventId).subscribe(
      data => {
        this.inviteCode = data['invite_code'];
      },
      error1 => {
        console.error(error1);
        this.activeModal.close("Error");
      }
    )
  }

}
