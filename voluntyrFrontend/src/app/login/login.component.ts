import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute, Data } from "@angular/router";
import { AuthenticationService } from "@app/_services/authentication.service";
import { throwError } from "rxjs";
import { DataService } from "@app/_services/data.service";
import { AlertService } from "@app/_services/alert.service";
import { environment } from "@environments/environment";
import * as decode from "jwt-decode";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  @Input() email: string;
  public CAPTCHAKEY = `${environment.captchaKey}`;
  private logged = false;
  emailControl: any;
  passwordControl: any;
  private captchaResolved = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private data: DataService,
    private alert: AlertService
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(["/"]);
    }
  }

  loginForm = new FormGroup({
    emailControl: new FormControl("", [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"),
      Validators.email
    ]),
    passwordControl: new FormControl("", [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  ngOnInit() {
    this.authService.getLogged.subscribe(name => this.changeLog(name));
    this.loginForm.patchValue({
      emailControl: this.email
    });
  }

  changeLog(log: boolean) {
    this.logged = log;
  }

  public resolved(captchaResponse: JSON) {
    console.log(`Resolved captcha with response: `, captchaResponse);
    if (captchaResponse) {
      this.captchaResolved = true;
    }
  }

  verifyLogin() {
    this.email = this.loginForm.controls.emailControl.value.toLowerCase();  // TODO: this.loginForm.controls.emailControl?
    if (this.logged) {
      this.router.navigateByUrl("/").then(() => {
        window.location.reload();
      });
    } else if (!this.loginForm.controls.emailControl.valid) {
      this.alert.error("Email invalid.");
    } else if (!this.loginForm.controls.passwordControl.valid) {
      this.alert.error("Password invalid.");
    } else if (!this.captchaResolved) {
      this.alert.error("Submit captcha before logging in.");
    } else {
      this.authService
        .login(
          this.loginForm.controls.emailControl.value,
          this.loginForm.controls.passwordControl.value
        )
        .subscribe(
          resp => {
            this.route.queryParams.subscribe(
              params => {
                let returnTo = params['returnUrl'];
                console.log('authy_sent', resp['authy_sent']);
                if (resp['authy_sent'] == true) {
                  if (returnTo == null) {
                    console.log("log resp = ", resp);
                    if (resp['access']) {
                      this.router.navigateByUrl("/DualAuth");
                    }
                  } else {
                    console.log("log resp = ", resp);
                    if (resp['access']) {
                      this.router.navigate(["/DualAuth"], {queryParams: {returnUrl: returnTo}});
                    }
                  }
                } else {
                  const token = JSON.parse(localStorage.getItem("currentUser")).access;
                  const tokenScope = decode(token);
                  if (tokenScope["scope"] == "organization") {
                    if (returnTo == null) {
                      const token = JSON.parse(localStorage.getItem("currentUser")).access;
                      const tokenScope = decode(token);
                      console.log("log resp = ", resp);
                      if (resp['access']) {
                        this.router.navigateByUrl("/Organization");
                      }
                    } else {
                      console.log("log resp = ", resp);
                      if (resp['access']) {
                        this.router.navigate(["/Organization"], {queryParams: {returnUrl: returnTo}});
                      }
                    }
                  } else if (tokenScope["scope"] == "volunteer") {
                    if (returnTo == null) {
                      const token = JSON.parse(localStorage.getItem("currentUser")).access;
                      const tokenScope = decode(token);
                      console.log("log resp = ", resp);
                      if (resp['access']) {
                        this.router.navigateByUrl("/Volunteer");
                      }
                    } else {
                      console.log("log resp = ", resp);
                      if (resp['access']) {
                        this.router.navigate(["/Volunteer"], {queryParams: {returnUrl: returnTo}});
                      }
                    }
                  }
                }
              }
            )
          },
          error => {
            console.log("error is of type ", typeof error);
            if (error === "Unauthorized") {
              this.alert.error(
                "Wrong password. Try again or click Forgot password to reset it."
              );
            } else if (error === "Bad Request") {
              this.alert.error("Couldn't find an account with that email");
            }
          }
        );
    }
  }
}
