import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "@app/_services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "@app/_services/data.service";
import {AlertService} from "@app/_services/alert.service";
import * as decode from "jwt-decode";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-dualauth',
  templateUrl: './dualauth.component.html',
  styleUrls: ['./dualauth.component.css']
})
export class DualauthComponent implements OnInit {

  dualAuthForm = new FormGroup({
    passwordControl: new FormControl('',[Validators.required])
  })

  constructor(private authService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute,
              private data: DataService,
              private alert: AlertService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  sendPassword() {
    const password = this.dualAuthForm.controls.passwordControl.value;
    this.authService.dual_auth(password)
      .subscribe(
        resp => {
          console.log('dual auth response = ', resp);
          if(resp.status === 200) {
            this.data.changeLogged("true");

            const token = decode(resp['access']);
            this.route.queryParams.subscribe(
              params => {
                let returnTo = params['returnUrl'];
                console.warn("ReturnTo: " + returnTo);
                if (returnTo == null) {
                  if (token["scope"] == "organization") {
                    this.router.navigateByUrl("/Organization");
                  } else if (token["scope"] == "volunteer") {
                    this.router.navigateByUrl("/Volunteer");
                  }
                } else {
                  this.router.navigateByUrl(returnTo);
                }
              }
            );
          }
        },
        error => {
          console.log('error is of type ', typeof error);
          localStorage.clear();
          if (error === 'Unauthorized') {
            this.alert.error('Unauthorized Dual Authentication');
          }
        }
      );

  }

}
