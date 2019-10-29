import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { decode } from "jwt-decode";
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
