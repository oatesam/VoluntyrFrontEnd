import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {AccountsService} from '../_services/accounts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '@app/_services/data.service';
import { AuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import {AuthenticationService} from "@app/_services/authentication.service";
import { SocialUser } from "angularx-social-login";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-email-input',
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.css']
})
export class EmailInputComponent {

  constructor(private accountService: AccountsService,
              private router: Router,
              private route: ActivatedRoute,
              private data: DataService,
              private socialAuthService: AuthService,
              private authService: AuthenticationService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  email: string;
  emailControl = new FormControl();
  accountStatus = 0;
  private user: SocialUser;
  private loggedIn: boolean;
  dateStruct: NgbDateStruct;
  date: {year: number, month: number};

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit()  {
    // this.emailControl.setValue(this.email);
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((userData) =>{
        console.log('wtf is going on')
        this.authService.socialLogin(userData.email, userData.id, userData.firstName, userData.lastName)
          .subscribe(
            resp => {
                this.authService.login(userData.email, userData.id).subscribe(
                  resp => {
                    this.route.queryParams.subscribe(
                  params => {
                          let returnTo = params['returnUrl'];
                          if (returnTo == null) {
                            console.log("log resp = ", resp);
                            if (resp['access']) {
                              this.router.navigateByUrl("/Volunteer");
                            }
                          } else {
                            console.log("log resp = ", resp);
                            if (resp['access']) {
                              this.router.navigate(["Volunteer"], { queryParams: { returnUrl: returnTo } });
                            }
                          }
                        }
                    )
                  }
                )
            }
          )
      }
    );
  }

  verifyEmail() {
    this.email = this.emailControl.value;
    this.email = this.email.toLowerCase();
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
