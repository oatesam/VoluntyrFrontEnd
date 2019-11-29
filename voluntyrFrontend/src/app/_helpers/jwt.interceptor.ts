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
    const helper = new JwtHelperService();
    console.log("JWT intercepted, pre intercept = ", request.headers);
    // add authorization header with jwt token if available
    let curUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log("curuser = ", curUser);
    if (curUser && curUser.access) {
      let isExpired = helper.isTokenExpired(curUser.access);
      if (isExpired) {
        const refreshToken = curUser.refresh;
        this.authenticationService.refreshToken(refreshToken);
        isExpired = false;
        curUser = JSON.parse(localStorage.getItem("currentUser"));
      }
      console.log("JWT Interceptor found curUser, token = ", curUser.access);
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${curUser.access}`
        }
      });
    }
    console.log("post intercept = ", request.headers);
    return next.handle(request);
  }
}
