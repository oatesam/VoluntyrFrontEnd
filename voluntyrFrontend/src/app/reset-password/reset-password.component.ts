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


  constructor(private authService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute,
              private data: DataService,
              private alert: AlertService,) { }

  ngOnInit() {
  }

  sendPasswordReset() {

  }

}
