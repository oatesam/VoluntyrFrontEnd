import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  baseurl: string = 'http://localhost:8000/api/';
  checkemailurl: string = 'http://localhost:8000/api/signup/checkemail/';
  orgregurl: string = 'http://localhost:8000/api/signup/organization/';
  volregurl: string = 'http://localhost:8000/api/signup/volunteer/';
  loginurl: string = 'http://localhost:8000/api/token/'
  refreshtoken: string = '';
  accesstoken: string = '';

  constructor(private http: HttpClient) {}

  checkEmail(email): Observable<any> {
    return this.http.post(this.checkemailurl, {'email': email}, { observe: 'response' });
  }

  registerOrganization(name, email, password, address, phonenumber): Observable<any> {
    // tslint:disable-next-line:max-line-length
    let body = {'name': name, 'email': email, 'password': password, 'address': address, 'phonenumber': phonenumber};
    console.log(body)
    return this.http.post(this.orgregurl, body, { observe: 'response' });
  }

  registerVolunteer(firstname, lastname, email, password, birthday): Observable<any> {
    // tslint:disable-next-line:max-line-length
    let body = {'first_name': firstname, 'last_name': lastname, 'email': email, 'password': password, 'birthday': birthday};
    console.log(body);
    return this.http.post(this.volregurl, body, { observe: 'response' });
  }

  login(email, password): Observable<any> {
    const body = new HttpParams()
    .set('email', email)
    .set('password', password);
    //console.log(body);

    return this.http.post(this.loginurl,
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    );
  }
}
