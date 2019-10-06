import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AccountsService} from '../_helpers/accounts.service';
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
  name = new FormControl('');
  email = new FormControl('');
  password = new FormControl('');
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
    this.accountService.registerVolunteer(this.name, this.email, this.password).subscribe(
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
    this.accountService.registerOrganization(this.name, this.email, this.password, this.address, this.phonenumber).subscribe(
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
