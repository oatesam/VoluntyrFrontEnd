import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private tokenUrl = `${environment.apiUrl}/api/token/`;
    private dualAuthUrl = `${environment.apiUrl}/api/token/dualauth/`;
    private recoverUrl = `${environment.apiUrl}/api/token/recover/`;
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private logged: boolean = false;

    @Output() getLogged: EventEmitter<any> = new EventEmitter();


    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public getToken(): string {
      return localStorage.getItem('token');
    }

    isLogged(): boolean {
      return this.logged;
    }

    login(email: string, password: string) {
      const body = new HttpParams()
        .set('email', email)
        .set('password', password);
      console.log(body);
      return this.http.post<any>(this.tokenUrl, body.toString(),
        {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded')
        })
            .pipe(map(user => {
              console.log('log in passed, now dual auth, user = ', user);
              this.logged = true;
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              // localStorage.setItem('currentUser', JSON.stringify(user));
              // To retrieve the current user
              // let curUser = localStorage.getItem(currentUser);
              this.currentUserSubject.next(user);
              this.getLogged.emit(true);
              return user;
            }))
        ;
    }

    logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.logged = false;
      this.currentUserSubject.next(null);
      this.getLogged.emit(false);
    }

    dual_auth(password: number) {
      const body = {'token': password};
      console.log('dual auth request ', body);
      return this.http.post(this.dualAuthUrl, body, { observe: 'response' }).pipe();
    }

    sendRecoverEmail(email: string, url: string) {
      const body = {'email': email, 'url': url};
      console.log('recovery request ', body);
      return this.http.post(this.recoverUrl, body, { observe: 'response' }).pipe();
    }
}
