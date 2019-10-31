import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../_services/authentication.service";
import { DataService } from "@app/_services/data.service";
import { Router } from "@angular/router";
import { decode } from "punycode";
import * as jwt_decode from "jwt-decode";

// TODO: Filter by scope of logged in user

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"]
})
export class NavBarComponent implements OnInit {
  showVolunteer: Boolean = false;
  showOrganization: Boolean = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}
  public currentUser = this.authService.currentUserValue;
  public logged: boolean;

  ngOnInit() {
    if (this.authService.currentUserValue) {
      this.logged = true;
    } else {
      this.logged = false;
    }
    this.scopeRender();
    this.authService.getLogged.subscribe(name => this.changeLog(name));
  }

  scopeRender() {
    var decodedToken = jwt_decode(
      JSON.parse(localStorage.getItem("currentUser")).access
    );
    var tokenScope = decodedToken.scope;
    if (tokenScope === "volunteer") {
      this.showVolunteer = true;
      this.showOrganization = false;
    } else if (tokenScope === "organization") {
      this.showOrganization = true;
      this.showVolunteer = false;
    }
  }
  changeLog(logger: boolean) {
    this.logged = logger;
  }

  navLogout() {
    this.authService.logout();
    window.location.reload();
  }
}
