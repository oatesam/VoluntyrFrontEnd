import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '@app/_services/authentication.service';
import { NavBarComponent} from "@app/nav-bar/nav-bar.component";
import { ErrorInterceptor } from "@app/_helpers/error.interceptor";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authservice: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute ) {
    if (this.authservice.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  email = new FormControl();
  password = new FormControl();
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
        this.accesstoken = resp.access;
        this.refreshtoken = resp.refresh;
        console.log(this.accesstoken);
        console.log(this.refreshtoken);
      }, error => {

      }

    );
  }


}
