import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../_services/authentication.service';
import {Router} from '@angular/router';
import * as jwt_decode from 'jwt-decode';

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
  ) {
    this.authService.getLogged.subscribe(name => this.changeLog(name));
  }
  public currentUser = this.authService.currentUserValue;
  public logged: boolean;

  ngOnInit() {
    if (this.authService.currentUserValue) {
      this.logged = true;
      this.scopeRender();
      this.authService.getLogged.subscribe(name => this.changeLog(name));
    } else {
      this.logged = false;
    }
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
    } else {
      this.showOrganization = false;
      this.showVolunteer = false;
    }
  }
  changeLog(logger: boolean) {
    this.logged = logger;
    if (logger) {
      this.scopeRender();
    }
  }

  navLogout() {
    this.authService.logout();
    // window.location.reload();
    this.showOrganization = false;
    this.showVolunteer = false;
  }
}
