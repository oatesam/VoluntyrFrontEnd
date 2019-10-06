import { Component, OnInit } from '@angular/core';
import { LoginComponent } from "../login/login.component";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor() { }
  public showLogin: boolean = true;

  ngOnInit() {
  }

  isAuthorized() {

  }
}
