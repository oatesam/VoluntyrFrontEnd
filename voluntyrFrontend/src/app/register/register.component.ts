import {Component, Input, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AccountsService} from '../_services/accounts.service';
import {Router, ActivatedRoute} from '@angular/router';
import {AlertService} from '@app/_services/alert.service';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {environment} from '@environments/environment';

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

  dateStruct: NgbDateStruct;
  date: {year: number, month: number};
  public showOrg = false;
  public buttonName: any = 'Volunteer';
  public oppReg: any = 'an Organization';
  public curReg: any = 'a Volunteer';
  public CAPTCHAKEY = `${environment.captchaKey}`;

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
  orgname = new FormControl('', [
        Validators.required,
        Validators.minLength(1)]);
  address = new FormControl('', [
        Validators.required,
        Validators.minLength(1)]);
  city = new FormControl('', [
        Validators.required,
        Validators.minLength(1)]);
  state = new FormControl('', [
        Validators.required,
        Validators.minLength(1)]);
  motto = new FormControl();
  phonenumber = new FormControl('', [
        Validators.required,
        Validators.minLength(1)]);
  captchaResolved = false;

  toggle() {
    this.showOrg = !this.showOrg;
    if (this.showOrg) {
      this.buttonName = 'Organization';
      this.oppReg = 'a Volunteer';
      this.curReg = 'an Organization';
    } else {
      this.buttonName = 'Volunteer';
      this.oppReg = 'an Organization';
      this.curReg = 'a Volunteer';
    }
  }

  ngOnInit() {
    this.emailControl.setValue(this.email);
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
    } else if (!this.dateStruct) {
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
       this.birthday = '' + this.dateStruct.year.toString() + '-' + this.dateStruct.month.toString() + '-' + this.dateStruct.day.toString();
       this.accountService.registerVolunteer(
        this.firstname.value,
        this.lastname.value,
        this.emailControl.value,
        this.password.value,
        this.birthday).subscribe(
        resp => {
          console.log(resp);
          if (resp.status === 201) {
            console.log(resp);
            this.router.navigateByUrl('login');
          } else if (resp.status === 409) {
            console.log(resp);
            alert("This email already has an account. Please login at the next page.");
            this.router.navigateByUrl('login');
          }
        }, error1 => {
          alert("There was a problem with your registration. Please try again later.");
          // TODO: Make this more user friendly
           this.router.navigateByUrl("");
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
        this.phonenumber.value,
        this.city.value,
        this.state.value,
        this.motto.value).subscribe(
        resp => {
          if (resp.status === 201) {
            this.router.navigateByUrl('login');
          } else if (resp.status === 409) {
            alert("This email already has an account. Please login at the next page.");
            this.router.navigateByUrl('login');
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
