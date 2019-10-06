import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  baseurl: String = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {}

  checkEmail(email): Observable<any> {
    return this.http.post(this.baseurl + 'signup/checkemail/', {'email': email}, { observe: 'response' });
  }

  register(name, email, password): Observable<any> {
    return this.http.post(this.baseurl + 'signup/register/', {'name': name, 'email': email, 'password': password}, { observe: 'response' });
  }

  login(email, password): Observable<any> {
    return this.http.post(this.baseurl + 'signup/login/', {'email': email, 'password': password}, { observe: 'response' });
  }
}
