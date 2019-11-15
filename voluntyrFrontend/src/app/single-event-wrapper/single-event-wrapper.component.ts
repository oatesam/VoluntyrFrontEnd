import { Component, OnInit } from '@angular/core';
import {Event} from '@app/_models/Event';
import {EventsService} from '@app/_services/events.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-single-event-wrapper',
  templateUrl: './single-event-wrapper.component.html',
  styleUrls: ['./single-event-wrapper.component.css']
})
export class SingleEventWrapperComponent implements OnInit {

  public singleEvent: Event;
  public showEvent: boolean = false;

  constructor(
    private es: EventsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      params => {
        let eventId = params.get('id');
        this.es.getEvent(eventId).subscribe(
          data => {
            this.singleEvent = data;
            console.log("Got single event");
            this.showEvent = true;
          },
          error => {
            console.error(error);
            this.error();
          }
        );
      }
    );
  }

  error() {
    alert("There was a problem finding this event...");
    this.router.navigateByUrl("Volunteer");
  }

}
