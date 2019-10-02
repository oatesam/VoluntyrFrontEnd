import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-email-input',
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.css']
})
export class EmailInputComponent{

  email = new FormControl('');

  getEmail() {
    return this.email;
  }

  verifyEmail() {

  }
}
