import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "@app/_services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "@app/_services/data.service";
import {AlertService} from "@app/_services/alert.service";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  passwordControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  passwordConfirmControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  user: any;

  constructor(private authService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute,
              private data: DataService,
              private alert: AlertService,) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.user = params.get("id");
    })
    console.log('reset password token = ', this.user);
  }

  sendPasswordReset() {
    if (!this.passwordControl.valid) {
      this.alert.error('Invalid password');
    } else if (this.passwordConfirmControl.value !== this.passwordControl.value) {
      this.alert.error('Passwords don\'t match')
    } else {
      this.authService.resetPassword(
        this.user,
        this.passwordControl.value,
        ).subscribe(
        resp => {
          console.log(resp);
          this.route.queryParams.subscribe(
              params => {
                let returnTo = params['returnUrl'];
                if (returnTo == null) {
                  if (resp.status === 200) {
                    console.log(resp);
                    this.alert.success('Your password reset succeeded, please log in.')
                    this.router.navigateByUrl('login');
                  } else {
                    this.alert.error('Your password reset failed, please try again.')
                  }
                }
              }
            );
        }, error1 => {
          alert("There was a problem with your password reset. Please try again later.");
          // TODO: Make this more user friendly
           this.router.navigateByUrl("");
         }
      );
    }
  }

}
