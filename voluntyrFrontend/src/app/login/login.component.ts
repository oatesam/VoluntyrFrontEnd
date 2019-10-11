import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute, Data} from '@angular/router';
import {AuthenticationService} from '@app/_services/authentication.service';
import {throwError} from 'rxjs';
import {DataService} from '@app/_services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() email: string;
  loginForm = new FormGroup({
      emailControl: new FormControl('', [Validators.required, Validators.minLength(4)]),
      passwordControl: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });

  constructor(private authService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute,
              private data: DataService) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }
  private logged  = false;

  ngOnInit() {
    this.authService.getLogged.subscribe(name => this.changeLog(name));
    this.loginForm.patchValue({
      emailControl: this.email
    });
  }

  changeLog(log: boolean) {
    this.logged = log;
  }

  verifyLogin() {
    if (this.logged) {
      this.router.navigate(['/']);
    } else {
      this.authService.login(this.loginForm.controls['emailControl'].value, this.loginForm.controls['passwordControl'].value).subscribe(
        resp => {
          console.log('log resp = ', resp);
          if (resp.access) {
            this.data.changeLogged('true');
            this.router.navigate(['/']);
          } else {
          }
        }
      );
    }
  }


}
