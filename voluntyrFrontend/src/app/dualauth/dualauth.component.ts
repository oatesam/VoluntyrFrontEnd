import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "@app/_services/authentication.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DataService } from "@app/_services/data.service";
import { AlertService } from "@app/_services/alert.service";
import * as jwt_decode from "jwt-decode";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-dualauth",
  templateUrl: "./dualauth.component.html",
  styleUrls: ["./dualauth.component.css"]
})
export class DualauthComponent implements OnInit {
  dualAuthForm = new FormGroup({
    passwordControl: new FormControl("", [Validators.required])
  });
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private data: DataService,
    private alert: AlertService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    localStorage.setItem("dualAuthPassed", "false");
  }

  sendPassword() {
    const password = this.dualAuthForm.controls.passwordControl.value;
    this.authService.dual_auth(password).subscribe(
      resp => {
        console.log("dual auth response = ", resp);
        if (resp.status === 200) {
          this.data.changeLogged("true");
          this.route.queryParams.subscribe(params => {
            const decodedToken = jwt_decode(
              JSON.parse(localStorage.getItem("currentUser")).access
            );
            const tokenScope = decodedToken["scope"];
            let returnTo = params["returnUrl"];
            console.log("scope = ", tokenScope);
            console.warn("ReturnTo: " + returnTo);
            localStorage.setItem("dualAuthPassed", "true");
            if (returnTo == null) {
              if (tokenScope === "organization") {
                this.router.navigateByUrl("/Organization");
              } else if (tokenScope === "volunteer") {
                this.router.navigateByUrl("/Volunteer");
              }
            } else {
              this.router.navigateByUrl(returnTo);
            }
          });
        } else {
          alert("That code is incorrect, please double check it is correct.");
        }
      },
      error => {
        console.log("error is of type ", typeof error);
        localStorage.clear();
        if (error === "Unauthorized") {
          this.alert.error("Unauthorized Dual Authentication");
        }
      }
    );
  }
}
