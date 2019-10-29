import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {EventsService} from '@app/_services/events.service';

@Component({
  selector: 'app-message-volunteers',
  templateUrl: './message-volunteers.component.html',
  styleUrls: ['./message-volunteers.component.css']
})
export class MessageVolunteersComponent implements OnInit {

// TODO: Should be accessed through nikhil's component?
  eventId = '1'; // TODO: Get event id from url: events/<eventid>/email/
  emailForm = this.fb.group({
    subject: ['', Validators.required],
    message: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private es: EventsService) { }

  ngOnInit() {
  }

  sendEmail() {
    if (this.emailForm.valid) {
      let subject = this.emailForm.value['subject'];
      let message = this.emailForm.value['message'];
      this.es.emailVolunteers(subject, message, this.eventId).subscribe(
        data => {
          console.log(data);
        },
        error1 => {
          console.log(error1);
        }
      )
    }
  }

}
