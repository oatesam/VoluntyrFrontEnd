import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '@environments/environment';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';


@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  checkemailurl: string = `${environment.apiUrl}/api/signup/checkemail/`;
  orgregurl: string = `${environment.apiUrl}/api/signup/organization/`;
  volregurl: string = `${environment.apiUrl}/api/signup/volunteer/`;
  loginurl: string = `${environment.apiUrl}/api/token/`;
  refreshtoken: string = '';
  accesstoken: string = '';

  constructor(private http: HttpClient) {}

  checkEmail(email): Observable<any> {
    return this.http.post(this.checkemailurl, {'email': email}, { observe: 'response' });
  }

  registerOrganization(name, email, password, address, phonenumber, city, state, motto): Observable<any> {
    // tslint:disable-next-line:max-line-length
    let body = {'name': name, 'email': email, 'password': password, 'street_address': address, 'phone_number': phonenumber, 'city': city, 'state': state, 'organization_motto': motto};
    console.log(body);
    return this.http.post(this.orgregurl, body, { observe: 'response' });
  }

  registerVolunteer(firstname, lastname, email, password, phonenumber, birthday): Observable<any> {
    // tslint:disable-next-line:max-line-length
    let body = {'first_name': firstname, 'last_name': lastname, 'email': email, 'password': password, 'phone_number': phonenumber, 'birthday': birthday};
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
