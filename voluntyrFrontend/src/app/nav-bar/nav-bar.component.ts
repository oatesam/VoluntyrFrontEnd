import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import {DataService} from "@app/_services/data.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private authService: AuthenticationService,
              private data: DataService) {}
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
    this.ngOnInit();
  }


}
