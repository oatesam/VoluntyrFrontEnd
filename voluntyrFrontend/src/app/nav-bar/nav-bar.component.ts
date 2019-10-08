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

  ngOnInit() {
    console.log(this.authService.currentUserValue)
    if(this.authService.currentUserValue){
      this.showLogin = false;
    } else {
      this.showLogin = true;
    }
  }

  navLogout(){
    this.authService.logout();
    this.ngOnInit();
  }


}
