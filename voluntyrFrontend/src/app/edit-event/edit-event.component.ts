import { Component, OnInit, Input} from '@angular/core';
import {Event} from '@app/_models/Event';
import {ActivatedRoute, Router} from '@angular/router';
import { OrganizationService } from '../_services/organization.service';
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertService} from "@app/_services/alert.service";
import {DataService} from "@app/_services/data.service";

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  event: Event;
  // tslint:disable-next-line:no-shadowed-variable
  constructor(private OrganizationService: OrganizationService,
              private router: Router,
              private route: ActivatedRoute,
              private httpClient: HttpClient,
              private data: DataService,
              private alert: AlertService) {
  }
  loginForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(10)]),
    location: new FormControl('', [
      Validators.required,
      Validators.minLength(10)]),
    eventdate: new FormControl('', [
      Validators.required]),
    starttime: new FormControl('', [
      Validators.required]),
    endtime: new FormControl('', [
      Validators.required]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10)]),
  });

  ngOnInit() {
    this.editEvent();
  }
  public editEvent() {
    return this.OrganizationService.editEvent(this.route.snapshot.paramMap.get('id')).subscribe(
      data => {
        this.event = data;
      });
  }
  updateEditedEvent() {
    console.log('In updateEditedEvent', this.event);
    if (!this.loginForm.controls.title.valid) {
       this.alert.error('Please enter Title');
    } else if (!this.loginForm.controls.location.valid) {
       this.alert.error('Please enter Location');
    } else if (!this.loginForm.controls.eventdate.valid) {
       this.alert.error('Please enter Event Date');
    } else if (!this.loginForm.controls.starttime.valid) {
       this.alert.error('Please enter Start Time');
    } else if (!this.loginForm.controls.endtime.valid) {
       this.alert.error('Please enter End Time');
    } else if (!this.loginForm.controls.description.valid) {
       this.alert.error('Please enter Description');
    } else {
      this.OrganizationService.updateEditedEvent(this.event);
      alert("Event has been Updated");

      this.router.navigateByUrl("Organization").then(() => {
        window.location.reload();
      });
    }
  }
  routeToDashBoard() {
    this.router.navigateByUrl("Organization");
  }
}
