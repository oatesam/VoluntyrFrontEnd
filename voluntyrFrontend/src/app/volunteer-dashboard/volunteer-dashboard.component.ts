import { Component, OnInit } from '@angular/core';
import {VolunteerService} from '../_services/volunteer.service';
import {Volunteer} from '../_helpers/Volunteer';
import {Event} from '../_helpers/Event';

@Component({
  selector: 'app-volunteer-dashboard',
  templateUrl: './volunteer-dashboard.component.html',
  styleUrls: ['./volunteer-dashboard.component.css']
})
export class VolunteerDashboardComponent implements OnInit {

  constructor(private VolunteerService: VolunteerService) { }

  private volunteer: Volunteer = new Volunteer();
  private events: Event[];

  private token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTcwNTE0ODU2LCJqdGkiOiI4M2ViODZjZTI1ZjA0MDE4OTEwMjY0YmZiZjMwNGVmOSIsInVzZXJfaWQiOjEsInNjb3BlIjoidm9sdW50ZWVyIn0.g0uHOtNEjgAlov4-jxGwdkcI1U0GAi7LqcC97vkeatQ";

  ngOnInit() {
    this.getDetails();
    this.getEvents();
  }

  private getDetails() {
    this.VolunteerService.getDetails(this.token).subscribe(
      data => {
        this.volunteer = data;
      }, error => {
        console.error(error);
      }
    )
  }

  private getEvents() {
    this.VolunteerService.getEvents(this.token).subscribe(
      data => {
        this.events = data;
      }, error => {
        console.error(error);
      }
    )
  }

}
