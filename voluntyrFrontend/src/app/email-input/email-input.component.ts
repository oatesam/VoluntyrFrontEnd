import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import {AccountsService} from '../_helpers/accounts.service';

@Component({
  selector: 'app-email-input',
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.css']
})
export class EmailInputComponent{

  constructor(private accountService: AccountsService) {
    this.verifyEmail()
  }


  email = new FormControl('');

  getEmail() {
    return this.email;
  }

  verifyEmail() {
    this.accountService.checkEmail("email").subscribe(
      resp => {
        console.log(resp.status);
      }
    );
  }
}
