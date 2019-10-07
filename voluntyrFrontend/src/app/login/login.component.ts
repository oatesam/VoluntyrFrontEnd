import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {AccountsService} from '../_services/accounts.service';
import {AuthenticationService} from '@app/_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authservice: AuthenticationService, private router: Router, private route: ActivatedRoute) { }

  email = new FormControl('testemail1@gmail.com');
  password = new FormControl('testpassword123');
  accesstoken = '';
  refreshtoken = '';

  ngOnInit() {
  }

  get Token() {
    return this.refreshtoken;
  }

  verifyLogin() {
    this.authservice.login(this.email.value, this.password.value).subscribe(
      resp => {
        console.log(resp);
        this.accesstoken = resp.access;
        this.refreshtoken = resp.refresh;
        console.log(this.accesstoken);
        console.log(this.refreshtoken);
        this.router.navigateByUrl('/');
      }, error => {

      }

    );
  }

}
