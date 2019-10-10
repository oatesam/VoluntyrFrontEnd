import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AccountsService} from '../_services/accounts.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() email: string;

  constructor(private accountService: AccountsService,
              private router: Router,
              private route: ActivatedRoute
  ) {  }

  public showOrg: boolean = false;
  public buttonName: any = 'Volunteer';
  public oppReg: any = 'an Organization';
  public curReg: any = 'a Volunteer'
  firstname = new FormControl('');
  lastname = new FormControl('');
  emailControl = new FormControl('');
  password = new FormControl('');
  birthday = new FormControl('')
  orgname = new FormControl('')
  address = new FormControl('');
  phonenumber = new FormControl('');

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
    this.emailControl.setValue(this.email);
  }

  verifyVolunteerRegistration() {
    this.accountService.registerVolunteer(this.firstname.value, this.lastname.value, this.emailControl.value, this.password.value, this.birthday.value).subscribe(
      resp => {
        console.log(resp)
        if (resp['status'] === 202) {
          console.log(resp);
          this.router.navigateByUrl('login');
        } else if (resp['status'] === 204) {
          console.log(resp);
          this.router.navigateByUrl('register');
        }
      }
    );
  }

  verifyOrganizationRegistration() {
    this.accountService.registerOrganization(this.orgname.value, this.emailControl.value, this.password.value, this.address.value, this.phonenumber.value).subscribe(
      resp => {
        console.log('is this thing working?')
        if (resp['status'] === 409) {
          console.log('got into status');
          this.router.navigateByUrl('login');
        } else if (resp['status'] === 204) {
          console.log(resp);
          this.router.navigateByUrl('');
        }
      }
    );
  }

  verifyReg() {
    if (this.showOrg) {
      this.verifyOrganizationRegistration();
    } else {
      this.verifyVolunteerRegistration();
    }
  }


}
