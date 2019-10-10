import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {AccountsService} from '../_services/accounts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '@app/_services/data.service';

@Component({
  selector: 'app-email-input',
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.css']
})
export class EmailInputComponent {

  constructor(private accountService: AccountsService,
              private router: Router,
              private route: ActivatedRoute,
              private data: DataService) {
  }
  email: string;
  emailControl = new FormControl('');
  accountStatus = 0;

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit()  {
    this.emailControl.setValue(this.email);
  }

  verifyEmail() {
    this.email = this.emailControl.value;
    console.log(this.email)
    // pass email into dataService to auto-access in Login/Register
    // this.data.changeCheckedEmail(this.emailControl.value);
    // HTTP request to check if email already exists
    this.accountService.checkEmail(this.email).subscribe(
      resp => {
        console.log(resp)
        if (resp['status'] === 202) {
          this.accountStatus = 2;
        } else if (resp['status'] === 204) {
          this.accountStatus = 1;
        }
      }
    );
  }
}
