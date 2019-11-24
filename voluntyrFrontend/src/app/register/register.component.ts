import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AccountsService} from '../_services/accounts.service';
import {Router, ActivatedRoute} from '@angular/router';
import {AlertService} from '@app/_services/alert.service';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {environment} from '@environments/environment';
import {CustomValidators} from "@app/custom-validator/custom-validators";

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
              private alert: AlertService,
              public fb: FormBuilder
  ) {  }

  dateStruct: NgbDateStruct;
  date: {year: number, month: number};
  public showOrg = false;
  public buttonName: any = 'Volunteer';
  public oppReg: any = 'an Organization';
  public curReg: any = 'a Volunteer';
  public CAPTCHAKEY = `${environment.captchaKey}`;

  emailControl = new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'),
        Validators.email]);

  orgregisterForm = this.fb.group({
      orgNameControl: new FormControl('', [Validators.required]),
      orgAddressControl: new FormControl('', [Validators.required]),
      cityControl: new FormControl('', [Validators.required]),
      stateControl: new FormControl('', [Validators.required]),
      orgMottoControl: new FormControl('', []),
      orgphoneControl: new FormControl('', [Validators.required]),
      passwordControl: new FormControl('', Validators.compose([Validators.required,
      CustomValidators.patternValidator(/\d/, {
              hasNumber: true
            }), CustomValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: true
            }), CustomValidators.patternValidator(/[a-z]/, {
              hasSmallCase: true
            }), Validators.minLength(8)])),
      confirmpasswordControl: new FormControl('', [Validators.required]),
  });

  volregisterForm = this.fb.group({
    firstNameControl: new FormControl('', [Validators.required]),
    lastNameControl: new FormControl('', [Validators.required]),
    birthDateControl: new FormControl('', [Validators.required]),
    volphonenumberControl: new FormControl('', [Validators.required]),
    volpasswordControl: new FormControl('', Validators.compose([Validators.required,
      CustomValidators.patternValidator(/\d/, {
              hasNumber: true
            }), CustomValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: true
            }), CustomValidators.patternValidator(/[a-z]/, {
              hasSmallCase: true
            }), Validators.minLength(8)])),
    confirmvolpasswordControl: new FormControl('', Validators.compose([Validators.required]))
  });
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
    this.email = this.email.toLowerCase();
    console.log('FName', this.volregisterForm.controls.firstNameControl.value);
    console.log('LName', this.volregisterForm.controls.lastNameControl.value);
    console.log('DOB', this.volregisterForm.controls.birthDateControl.value);
    console.log('Password', this.volregisterForm.controls.volpasswordControl.value);
    if (!this.emailControl.valid) {
      alert('Invalid email');
    } else if (this.volregisterForm.controls.volpasswordControl.value !== this.volregisterForm.controls.confirmvolpasswordControl.value) {
      alert('Passwords don\'t match');
    } else if (!this.captchaResolved) {
       this.alert.error('Submit captcha before logging in.');
    } else {
       console.log('else');
       this.accountService.registerVolunteer(
        this.volregisterForm.controls.firstNameControl.value,
        this.volregisterForm.controls.lastNameControl.value,
        this.emailControl.value,
        this.volregisterForm.controls.volpasswordControl.value,
        this.volregisterForm.controls.volphonenumberControl.value,
        this.volregisterForm.controls.birthDateControl.value).subscribe(
        resp => {
          console.log(resp);
          console.log(resp.status);
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
    console.log('Name', this.orgregisterForm.controls.orgNameControl.value);
    console.log('Email', this.email);
    console.log('Password', this.orgregisterForm.controls.passwordControl.value);
    console.log('Address', this.orgregisterForm.controls.orgAddressControl.value);
    console.log('Phone', this.orgregisterForm.controls.orgphoneControl.value);
    console.log('City', this.orgregisterForm.controls.cityControl.value);
    console.log('State', this.orgregisterForm.controls.stateControl.value);
    console.log('Motto', this.orgregisterForm.controls.orgMottoControl.value);
    if (!this.emailControl.valid) {
      alert('Invalid email');
    } else if (this.orgregisterForm.controls.passwordControl.value !== this.orgregisterForm.controls.confirmpasswordControl.value) {
      alert('Passwords dont match');
    } else if (!this.captchaResolved) {
       alert('Submit captcha before logging in.');
    } else {
      this.accountService.registerOrganization(
        this.orgregisterForm.controls.orgNameControl.value,
        this.emailControl.value,
        this.orgregisterForm.controls.passwordControl.value,
        this.orgregisterForm.controls.orgAddressControl.value,
        this.orgregisterForm.controls.orgphoneControl.value,
        this.orgregisterForm.controls.cityControl.value,
        this.orgregisterForm.controls.stateControl.value,
        this.orgregisterForm.controls.orgMottoControl.value).subscribe(
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
