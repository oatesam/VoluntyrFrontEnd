import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AccountsService} from '../_services/accounts.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private accountService: AccountsService, private router: Router, private route: ActivatedRoute) {
  }

  public showOrg: boolean = false;
  public buttonName: any = 'Volunteer';
  firstname = new FormControl('Sam');
  lastname = new FormControl('Fake');
  email = new FormControl('samfake@gmail.com');
  password = new FormControl('samfake');
  birthday = new FormControl('1998-06-12')
  orgname = new FormControl('')
  address = new FormControl('');
  phonenumber = new FormControl('');

  toggle() {
    this.showOrg = !this.showOrg;
    if (this.showOrg) {
      this.buttonName = 'Organization';
    } else {
      this.buttonName = 'Volunteer';
    }
  }

  ngOnInit() {
  }

  verifyVolunteerRegistration() {
    this.accountService.registerVolunteer(this.firstname.value, this.lastname.value, this.email.value, this.password.value, this.birthday.value).subscribe(
      resp => {
        if (resp === 202) {
          console.log(resp);
          this.router.navigateByUrl('../../login');
        } else if (resp === 204) {
          console.log(resp);
          this.router.navigateByUrl('');
        }
      }
    );
  }

  verifyOrganizationRegistration() {
    this.accountService.registerOrganization(this.orgname.value, this.email.value, this.password.value, this.address.value, this.phonenumber.value).subscribe(
      resp => {
        if (resp === 202) {
          console.log(resp);
          this.router.navigateByUrl('../../login');
        } else if (resp === 204) {
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
