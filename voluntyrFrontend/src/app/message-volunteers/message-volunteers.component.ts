import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EventsService} from '@app/_services/events.service';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '@environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
import {Event} from '@app/_models/Event';

@Component({
  selector: 'app-message-volunteers',
  templateUrl: './message-volunteers.component.html',
  styleUrls: ['./message-volunteers.component.css']
})
export class MessageVolunteersComponent implements OnInit {

  emailError: boolean = false;
  hide: boolean = false;
  eventId = '-1';
  event: Event;

  messageForm = new FormGroup({
    replytoControl: new FormControl('', [Validators.required, Validators.email]),
    subjectControl: new FormControl('', [Validators.required]),
    messageControl: new FormControl('', [Validators.required])
  });

  constructor(private fb: FormBuilder, private es: EventsService, private activatedRoute: ActivatedRoute, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      params => {
        this.eventId = params.get('eventid');
        if (!environment.production) {
          console.log(this.eventId);
        }
      }
    );
    // TODO: Get event for event.title
  }

  sendEmail() {
    if (this.messageForm.controls.replytoControl.valid && this.messageForm.controls.subjectControl.valid && this.messageForm.controls.messageControl.valid) {
      this.spinner.show();
      this.hide = true;

      let subject = this.messageForm.controls.subjectControl.value;
      let message = this.messageForm.controls.messageControl.value;
      let replyto = this.messageForm.controls.replytoControl.value;
      this.es.emailVolunteers(subject, message, replyto, this.eventId).subscribe(
        data => {
          console.log(data);
          this.spinner.hide();
          this.hide = false;
          this.router.navigate(['/Organization']); // TODO: Nav back to nikhil's component
        },
        error1 => {
          console.log(error1);
          this.spinner.hide();
          this.hide = false;
          this.emailError = true;
        }
      )
    }
  }

}
