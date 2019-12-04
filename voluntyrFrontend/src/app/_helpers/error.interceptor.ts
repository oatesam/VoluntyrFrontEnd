import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthenticationService } from "../_services/authentication.service";
import { AlertService } from "@app/_services/alert.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private alert: AlertService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("ErrorInterceptor handling");
    return next.handle(request).pipe(
      catchError((err, caught) => {
        const helper = new JwtHelperService();
        let curUser = JSON.parse(localStorage.getItem("currentUser"));
        if (err.status === 401 || err.status === 500) {
          let isExpired = helper.isTokenExpired(curUser.access);
          if (isExpired) {
            localStorage.setItem("refreshingToken", "true");
            const refreshToken = curUser.refresh;
            this.authenticationService.refreshToken(refreshToken).subscribe(
              data => {
                var newAccess = data.access;
                let oldUser = JSON.parse(localStorage.getItem("currentUser"));
                oldUser.access = newAccess;
                localStorage.setItem("currentUser", JSON.stringify(oldUser));
                isExpired = false;
                curUser = JSON.parse(localStorage.getItem("currentUser"));
                request.headers.set(
                  "Authorization",
                  "Bearer " + curUser.access
                );
                let newrequest = request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${curUser.access}`
                  }
                });
                localStorage.setItem("refreshingToken", "false");
                window.location.reload();
                return next.handle(request);
              },
              error => {
                return next.handle(request);
              }
            );
          }
          //window.location.reload();
          // auto logout if 401 response returned from api
          //commented out logout because user unfriendly
          //this.authenticationService.logout();
        }
        const error = err.statusText;
        return throwError(error);
      })
    );
  }
}
