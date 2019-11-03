import {Component, OnInit, Input, ChangeDetectorRef, AfterViewInit, HostListener, wtfStartTimeRange} from '@angular/core';
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
import {EventsService} from '@app/_services/events.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit, CanComponentDeactivate  {
  event: Event;
  submitted: boolean = false;

  numberOfVols: number;
  volunteers;
  private eventid: string;

  // tslint:disable-next-line:no-shadowed-variable
  constructor(private OrganizationService: OrganizationService,
              private router: Router,
              private route: ActivatedRoute,
              private httpClient: HttpClient,
              private data: DataService,
              private alert: AlertService,
              private cdr: ChangeDetectorRef,
              private dialogService: DialogService,
              private es: EventsService) {
  }
  loginForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(1)]),
    location: new FormControl('', [
      Validators.required,
      Validators.minLength(1)]),
    eventdate: new FormControl('', [
      Validators.required]),
    starttime: new FormControl('', [
      Validators.required]),
    endtime: new FormControl('', [
      Validators.required]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(1)]),
  });

  ngOnInit() {
    this.eventid = this.route.snapshot.paramMap.get('id');
    this.editEvent();
    this.es.getVolunteers(this.eventid).subscribe(
        data => {
          this.numberOfVols = data["number"];
          this.volunteers = data["volunteers"]
        },
        error1 => {
          console.error(error1);
        }
      )
  }

  public editEvent() {
    return this.OrganizationService.editEvent(this.eventid).subscribe(
      data => {
        this.event = data;
        this.setForm();
      });
  }

  setForm() {
    // var dateObj = moment(oldDate, "YYY-MM-DDTHH:mm:ssZ").toDate();
    // console.log("Real starttime: ", this.event.start_time);
    // console.log("Real endtime: ", this.event.end_time);
    // console.log((<string> (<unknown> this.event.start_time)).replace(new RegExp('-\\d\\d:\\d\\d'), ""));
    this.loginForm.controls.title.setValue(this.event.title);
    this.loginForm.controls.location.setValue(this.event.location);
    this.loginForm.controls.eventdate.setValue(this.event.date);
    this.loginForm.controls.starttime.setValue((<string> (<unknown> this.event.start_time)).replace(new RegExp('-\\d\\d:\\d\\d'), ""));
    this.loginForm.controls.endtime.setValue((<string> (<unknown> this.event.end_time)).replace(new RegExp('-\\d\\d:\\d\\d'), ""));
    this.loginForm.controls.description.setValue(this.event.description);
  }

  updateEditedEvent() {
    if (!this.loginForm.controls.title.valid) {
       this.alert.error('Please enter Title');
    } else if (!this.loginForm.controls.location.valid) {
       this.alert.error('Please enter Location');
    } else if (!this.loginForm.controls.eventdate.valid) {
       this.alert.error('Please enter Event Date');
    } else if (!this.loginForm.controls.description.valid) {
       this.alert.error('Please enter Description');
    } else {
      this.event.title = this.loginForm.controls.title.value.toString();
      this.event.location = this.loginForm.controls.location.value.toString();
      this.event.date = this.loginForm.controls.eventdate.value.toString();
      this.event.start_time = this.loginForm.controls.starttime.value.toString();
      this.event.end_time = this.loginForm.controls.endtime.value.toString();
      this.event.description = this.loginForm.controls.description.value.toString();

      this.OrganizationService.updateEditedEvent(this.event).subscribe(
        data => {
          this.submitted = true;
          // alert("Event has been Updated");
          this.routeToDashBoard();
        },
        error => {
          alert("There was a problem updating your event, please try again later.")
        }
      );
    }
  }

  routeToDashBoard() {
    this.router.navigateByUrl("Organization");
  }

  canDeactivate(): Observable<boolean> | boolean {
    console.log("Can deactivate");
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    if (!this.submitted && this.loginForm.dirty) { //!this.unsavedEdits
      return this.dialogService.confirm('Discard changes?');
    } else {
      return true;
    }
  }

  messageVolunteers() {
    this.router.navigateByUrl("message/" + this.event.id);
  }
}
