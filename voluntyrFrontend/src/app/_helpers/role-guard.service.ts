import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
<<<<<<< HEAD
import * as decode from "jwt-decode";
=======
import { decode } from "jwt-decode";
>>>>>>> b9b650f86d6ebaeb504afbf6b730c67f71a51f72
@Injectable({
  providedIn: "root"
})
export class RoleGuardService implements CanActivate {
  constructor(public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    //param from route data property
    const expectedRole = route.data.expectedRole;

    //retrieve token form local storage
    const token = JSON.parse(localStorage.getItem("currentUser")).access;
    //decode token to get scope
    const tokenScope = decode(token);
<<<<<<< HEAD
    console.log(tokenScope);
=======
>>>>>>> b9b650f86d6ebaeb504afbf6b730c67f71a51f72
    //check scope
    if (tokenScope.scope === expectedRole) {
      return true;
    } else {
      //return error message or reroute
      alert("You must be a " + expectedRole + " to access this page");
      return false;
    }
  }
}
