import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private authService: AuthenticationService) {}
  public showLogin: boolean = true;
  public currentUser = this.authService.currentUserValue;

  ngOnInit() {
    if(this.authService.currentUserValue){
      this.showLogin = false;
    } else {
      this.showLogin = true;
    }


  }

  checkLog() {
    if(this.authService.currentUserValue){
      this.showLogin = false;
    } else {
      this.showLogin = true;
    }
  }

  navLogout() {
    this.authService.logout();
    this.ngOnInit();
  }


}
