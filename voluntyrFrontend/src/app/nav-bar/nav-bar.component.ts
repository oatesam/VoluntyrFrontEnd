import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import {DataService} from '@app/_services/data.service';
import {Router} from '@angular/router';

// TODO: Filter by scope of logged in user

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private authService: AuthenticationService,
              private router: Router) {}
  public currentUser = this.authService.currentUserValue;
  private logged: boolean;

  ngOnInit() {
    if (this.authService.currentUserValue) {
      this.logged = true;
    } else {
      this.logged = false;
    }
    this.authService.getLogged.subscribe(name => this.changeLog(name));
  }

  changeLog(logger: boolean) {
    this.logged = logger;
  }

  navLogout() {
    this.authService.logout();
    window.location.reload();
  }


}
