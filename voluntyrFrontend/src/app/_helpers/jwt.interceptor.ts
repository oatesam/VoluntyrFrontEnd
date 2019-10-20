import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService} from '../_services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log('JWT intercepted, pre intercept = ', request.headers);
      // add authorization header with jwt token if available
      let curUser = JSON.parse(localStorage.getItem('currentUser'));
      console.log('curuser = ', curUser, ' curser.access = ', curUser.access);
      if (curUser && curUser.access) {
        console.log('JWT Interceptor found curUser, token = ', curUser.access);
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${curUser.access}`
          }
        });
      }
      console.log('post intercept = ', request.headers)
      return next.handle(request);
    }
}
