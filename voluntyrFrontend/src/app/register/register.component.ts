import {Component, Input, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AccountsService} from '../_services/accounts.service';
import {Router, ActivatedRoute} from '@angular/router';
import {AlertService} from '@app/_services/alert.service';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() email: string;

  constructor(private accountService: AccountsService,
              private router: Router,
              private route: ActivatedRoute,
              private alert: AlertService
  ) {  }

  model: NgbDateStruct;
  date: {year: number, month: number};
  public showOrg = false;
  public buttonName: any = 'Volunteer';
  public oppReg: any = 'an Organization';
  public curReg: any = 'a Volunteer';
  firstname = new FormControl('', [
        Validators.required,
        Validators.minLength(1) ]);
  lastname = new FormControl('', [
        Validators.required,
        Validators.minLength(1)]);
  birthday: string;
  emailControl = new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'),
        Validators.email]);
  password = new FormControl('', [
        Validators.required,
        Validators.minLength(8)]);
  passwordconfirm = new FormControl('');
  orgname = new FormControl('');
  address = new FormControl('');
  phonenumber = new FormControl('');
  captchaResolved = false;

  toggle() {
    this.showOrg = !this.showOrg;
    if (this.showOrg) {
      this.buttonName = 'Organization';
      this.oppReg = 'a Volunteer';
    } else {
      this.buttonName = 'Volunteer';
      this.curReg = 'an Organization';
    }
  }

  ngOnInit() {
  }

  public resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: `, captchaResponse);
    if (captchaResponse) {
      this.captchaResolved = true;
    }
  }

  verifyVolunteerRegistration() {
    if (!this.firstname.valid || !this.lastname.valid) {
      this.alert.error('Please enter your name');
    } else if (!this.model) {
      this.alert.error('Please choose your birthday in calendar');
    } else if (!this.emailControl.valid) {
      this.alert.error('Invalid email');
    } else if (!this.password.valid) {
      this.alert.error('Invalid password');
    } else if (this.password.value !== this.passwordconfirm.value) {
      this.alert.error('Passwords don\'t match');
    } else if (!this.captchaResolved) {
       this.alert.error('Submit captcha before logging in.');
    } else {
       this.birthday = '' + this.model.day.toString() + '-' + this.model.month.toString() + '-' + this.model.year.toString();
       this.accountService.registerVolunteer(
        this.firstname.value,
        this.lastname.value,
        this.emailControl.value,
        this.password.value,
        this.birthday).subscribe(
        resp => {
          console.log(resp);
          if (resp.status === 202) {
            console.log(resp);
            this.router.navigateByUrl('login');
          } else if (resp.status === 204) {
            console.log(resp);
            this.router.navigateByUrl('register');
          }
        }
      );
    }
  }

  verifyOrganizationRegistration() {
    if (!this.emailControl.valid) {
      this.alert.error('Invalid email');
    } else if (this.password.value !== this.passwordconfirm.value) {
      this.alert.error('Passwords don\'t match');
    } else {
      this.accountService.registerOrganization(
        this.orgname.value,
        this.emailControl.value,
        this.password.value,
        this.address.value,
        this.phonenumber.value).subscribe(
        resp => {
          console.log('is this thing working?');
          if (resp.status === 409) {
            console.log('got into status');
            this.router.navigateByUrl('login');
          } else if (resp.status === 204) {
            console.log(resp);
            this.router.navigateByUrl('');
          }
        }
      );
    }
  }

  verifyReg() {
    if (this.showOrg) {
      this.verifyOrganizationRegistration();
    } else {
      this.verifyVolunteerRegistration();
    }
  }


}
