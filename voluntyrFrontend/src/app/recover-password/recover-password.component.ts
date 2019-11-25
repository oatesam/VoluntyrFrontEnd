import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "@app/_services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "@app/_services/data.service";
import {AlertService} from "@app/_services/alert.service";
import {NgxSpinnerService} from "ngx-spinner";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  recoverForm = new FormGroup({
    emailControl: new FormControl('', [Validators.required])
  });

  emailsent = false;

  constructor(private authService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute,
              private data: DataService,
              private alert: AlertService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  sendRecoverEmail() {
    const email = this.recoverForm.controls.emailControl.value;
    this.emailsent = true;
    const urlstring = location.href;
    this.authService.sendRecoverEmail(email, urlstring)
      .subscribe(
        resp => {
          console.log('recover email response = ', resp);
          if(resp.status === 200) {
            this.emailsent = true;
          }
          this.emailsent = true;
        }
      );
  }

}
