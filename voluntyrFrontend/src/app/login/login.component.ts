import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute, Data} from '@angular/router';
import {AuthenticationService} from '@app/_services/authentication.service';
import {throwError} from 'rxjs';
import {DataService} from '@app/_services/data.service';
import {AlertService} from '@app/_services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() email: string;
  loginForm = new FormGroup({
      emailControl: new FormControl('', [
        Validators.required,
        Validators.minLength(4)]),
      passwordControl: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'),
        Validators.email]),
    });

  constructor(private authService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute,
              private data: DataService,
              private alert: AlertService) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }
  private logged  = false;
  emailControl: any;
  passwordControl: any;
  private captchaResolved = false;

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
    if (this.logged) {
      this.router.navigate(['/']);
    } else if (!this.captchaResolved) {
       this.alert.error('Submit captcha before logging in.');
    } else {
        this.authService.login(this.loginForm.controls.emailControl.value, this.loginForm.controls.passwordControl.value).subscribe(
          resp => {
            console.log('log resp = ', resp);
            if (resp.access) {
              this.data.changeLogged('true');
              this.router.navigate(['/']);
            }
          }, error => {
            console.log('error is of type ', typeof error);
            if (error === 'Unauthorized') {
              this.alert.error('Wrong password. Try again or click Forgot password to reset it.');
            } else if (error === 'Bad Request') {
              this.alert.error('Couldn\'t find an account with that email');
            }
          })
      };
    }


}
