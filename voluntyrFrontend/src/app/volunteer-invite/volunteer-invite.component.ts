import { Component, OnInit } from '@angular/core';
import {EventsService} from '@app/_services/events.service';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '@environments/environment';

@Component({
  selector: 'app-volunteer-invite',
  templateUrl: './volunteer-invite.component.html',
  styleUrls: ['./volunteer-invite.component.css']
})
export class VolunteerInviteComponent implements OnInit {

  constructor(
    private es: EventsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      params => {
        let invite = params.get('invite');
        this.es.processInviteCode(invite).subscribe(
          data => {
            let eventId = data["event"];
            if (!environment.production) {
              console.log("Accepted invite for: " + eventId);
            }
            this.router.navigateByUrl("Event/" + eventId);
          },
          error1 => {
            console.error(error1);
            alert("There was an error with your invite... Please check your invite or try again later.")
            this.router.navigateByUrl("Volunteer");
          }
        )
      }
    );
  }

}
