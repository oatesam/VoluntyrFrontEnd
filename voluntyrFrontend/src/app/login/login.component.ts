import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router, ActivatedRoute} from "@angular/router";
import {AccountsService} from "../_helpers/accounts.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private accountService: AccountsService, private router: Router, private route: ActivatedRoute) { }

  email = new FormControl('');
  password = new FormControl('');

  ngOnInit() {
  }

  verifyLogin() {
    this.accountService.login(this.email, this.password).subscribe(
      resp => {
        if (resp === 202) {
          console.log(resp);
          this.router.navigateByUrl('../../account');
        } else if (resp === 401) {
          console.log(resp);
          this.router.navigateByUrl('');
        }
      }
    );
  }

}
