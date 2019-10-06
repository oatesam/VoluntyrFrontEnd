import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import {AccountsService} from '../_helpers/accounts.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-email-input',
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.css']
})
export class EmailInputComponent{

  constructor(private accountService: AccountsService, private router: Router, private route: ActivatedRoute) {
  }


  email = new FormControl('');

  getEmail() {
    return this.email;
  }

  verifyEmail() {
    this.accountService.checkEmail(this.email).subscribe(
      resp => {
        if (resp === 204) {
          console.log(resp);
          this.router.navigateByUrl('../../login');
        } else if (resp === 202) {
          console.log(resp);
          this.router.navigateByUrl('../../register');
        }
      }
    );
  }
}
