import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EventsService} from '@app/_services/events.service';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '@environments/environment';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-message-volunteers',
  templateUrl: './message-volunteers.component.html',
  styleUrls: ['./message-volunteers.component.css']
})
export class MessageVolunteersComponent implements OnInit {

  emailError: boolean = false;
  hide: boolean = false;
  eventId = '-1';

  replyto = new FormControl('', [Validators.required, Validators.email]);
  subject = new FormControl('', [Validators.required]);
  message = new FormControl('', [Validators.required]);

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
  }

  sendEmail() {
    if (this.replyto.valid && this.subject.valid && this.message.valid) {
      this.spinner.show();
      this.hide = true;

      let subject = this.subject.value;
      let message = this.message.value;
      let replyto = this.replyto.value;
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
