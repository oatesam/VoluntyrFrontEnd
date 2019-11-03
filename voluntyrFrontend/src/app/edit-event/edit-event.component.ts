import { Component, OnInit, Input, ChangeDetectorRef, AfterViewInit, HostListener} from '@angular/core';
import {Event} from '@app/_models/Event';
import {ActivatedRoute, Router} from '@angular/router';
import { OrganizationService } from '../_services/organization.service';
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertService} from "@app/_services/alert.service";
import {DataService} from "@app/_services/data.service";
import {Observable} from "rxjs";
import {CanComponentDeactivate, CanDeactivateGuard} from "@app/_helpers/can-deactivate.guard";
import {DialogService} from "@app/_services/dialog.service";

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit, CanComponentDeactivate  {
  event: Event;
  formSubmitted: boolean;
  // tslint:disable-next-line:no-shadowed-variable
  constructor(private OrganizationService: OrganizationService,
              private router: Router,
              private route: ActivatedRoute,
              private httpClient: HttpClient,
              private data: DataService,
              private alert: AlertService,
              private cdr: ChangeDetectorRef,
              private dialogService: DialogService) {
  }
  loginForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(2)]),
    location: new FormControl('', [
      Validators.required,
      Validators.minLength(2)]),
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
        this.event.end_time = new Date(data.end_time)
        console.log(typeof this.event.end_time);
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
    } else if (!this.loginForm.controls.description.valid) {
       this.alert.error('Please enter Description');
    } else {
      console.log('Event Object', this.event)
      this.OrganizationService.updateEditedEvent(this.event);
      this.formSubmitted = true;
      alert("Event has been Updated");

      this.router.navigateByUrl("Organization");
    }
  }
  routeToDashBoard() {
    this.router.navigateByUrl("Organization");
  }
  // @ts-ignore
  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    if (this.formSubmitted) {
      return true;
    } else {
      return this.dialogService.confirm('Discard changes?');
    }
  }
}
