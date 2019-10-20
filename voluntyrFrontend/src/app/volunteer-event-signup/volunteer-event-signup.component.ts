import { Component, OnInit } from '@angular/core';
import { VolunteerService } from '../_services/volunteer.service';
import { Volunteer } from '../_models/Volunteer';
import { Event } from '../_models/Event';
import { faUser, faCalendarPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-volunteer-event-signup',
  templateUrl: './volunteer-event-signup.component.html',
  styleUrls: ['./volunteer-event-signup.component.css']
})
export class VolunteerEventSignupComponent implements OnInit {

  constructor(private volunteerService: VolunteerService) { }

  faUser = faUser;
  faCalendarPlus = faCalendarPlus;

  public volunteer: Volunteer = new Volunteer();
  public events: Event[];

  public token = JSON.parse(localStorage.getItem('currentUser')).access;
  ngOnInit() {
    this.getUpcomingEvents();
  }

  private getUpcomingEvents() {
    this.volunteerService.getUpcomingEvents(this.token).subscribe(
      data => {
        this.events = data;
      },
      error => {
        console.error(error);
      }
    );
  }
}
