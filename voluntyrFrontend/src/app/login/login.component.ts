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

  email = new FormControl('testemail1@gmail.com');
  password = new FormControl('testpassword123');
  accesstoken : string = '';
  refreshtoken: string = '';

  ngOnInit() {
  }

  get Token() {
    return this.refreshtoken;
  }

  verifyLogin() {
    console.log(this.email.value)
    this.accountService.login(this.email.value, this.password.value).subscribe(
      resp => {
        console.log(resp);
        this.accesstoken = resp['access'];
        this.refreshtoken = resp['refresh'];
        console.log(this.accesstoken);
        console.log(this.refreshtoken);
        this.router.navigateByUrl('/');
      }, error => {

      }

    );
  }

}
