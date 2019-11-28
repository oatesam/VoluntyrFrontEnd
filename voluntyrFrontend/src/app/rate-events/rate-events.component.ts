import { Component, OnInit } from '@angular/core';
import {VolunteerService} from '@app/_services/volunteer.service';
import {EventsService} from '@app/_services/events.service';
import {SearchEvent} from '@app/_models/SearchEvent';

@Component({
  selector: 'app-rate-events',
  templateUrl: './rate-events.component.html',
  styleUrls: ['./rate-events.component.css']
})
export class RateEventsComponent implements OnInit {

  events: SearchEvent[];

  constructor(
    private vs: VolunteerService,
    private es: EventsService
  ) { }

  ngOnInit() {
    this.vs.getUnratedEvent().subscribe(
      data => {
        this.events = data;
      },
      error => {
        console.error(error);
      }
    )
  }

}
