import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../_services/authentication.service';
import {AlertService} from "@app/_services/alert.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private alert: AlertService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log('ErrorInterceptor handling');
      return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                console.log('err message  = ', err.statusText);
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
            }
            const error = err.statusText;
            return throwError(error);
        }));
    }
}
