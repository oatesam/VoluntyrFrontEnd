import { Injectable } from "@angular/core";
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import * as decode from "jwt-decode";
import {AuthenticationService} from '@app/_services/authentication.service'; // Don't add @types/jwt-decode to dependencies
@Injectable({
  providedIn: "root"
})
export class RoleGuardService implements CanActivate {

  constructor(public router: Router, private as: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.as.currentUserValue;
    if (currentUser) {
      //param from route data property
      const expectedRole = route.data.expectedRole;

      //retrieve token form local storage
      const token = JSON.parse(localStorage.getItem("currentUser")).access;
      //decode token to get scope
      const tokenScope = decode(token);
      //check scope
      if (tokenScope["scope"] === expectedRole) {
        return true;
      } else {
        //return error message or reroute
        alert("You must be a " + expectedRole + " to access this page");
      }
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate([''], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
