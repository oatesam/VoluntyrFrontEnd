import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthenticationService } from "../_services/authentication.service";
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (localStorage.getItem("refreshingToken") === "true") {
      return next.handle(request);
    } else {
      const helper = new JwtHelperService();
      console.log("JWT intercepted, pre intercept = ", request.headers);
      // add authorization header with jwt token if available
      let curUser = JSON.parse(localStorage.getItem("currentUser"));
      console.log("curuser = ", curUser);
      if (curUser && curUser.access) {
        let isExpired = helper.isTokenExpired(curUser.access);
        console.log("before is expired~~~");
        if (isExpired) {
          console.log("expireddddddd");
          localStorage.setItem("refreshingToken", "true");
          const refreshToken = curUser.refresh;
          this.authenticationService.refreshToken(refreshToken).subscribe(
            data => {
              console.log("inside data!!!!!!!!!!!");
              var newAccess = data.access;
              let oldUser = JSON.parse(localStorage.getItem("currentUser"));
              oldUser.access = newAccess;
              localStorage.setItem("currentUser", JSON.stringify(oldUser));
              isExpired = false;
              curUser = JSON.parse(localStorage.getItem("currentUser"));
              request = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${curUser.access}`
                }
              });
              localStorage.setItem("refreshingToken", "false");
              return next.handle(request);
            },
            error => {
              return next.handle(request);
            }
          );
        } else {
          console.log(
            "JWT Interceptor found curUser, token = ",
            curUser.access
          );
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${curUser.access}`
            }
          });
          return next.handle(request);
        }
      } else {
        return next.handle(request);
      }
      console.log("post intercept = ", request.headers);
    }
  }
}
