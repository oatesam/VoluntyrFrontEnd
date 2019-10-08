import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/_services/authentication.service';

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
    this.authService.login(this.currentUser.username, this.currentUser.password).subscribe(
      (data) => {
        console.log(data);
        this.ngOnInit();
      },
      error => {
        console.log('Error');
      }
    );

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
