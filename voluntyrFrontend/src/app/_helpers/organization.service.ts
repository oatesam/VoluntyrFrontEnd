import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { organization } from "../organizer-dashboard/organization";
import { Observable } from "rxjs";
import {environment} from '@environments/environment';
@Injectable({
  providedIn: "root"
})
export class OrganizationService {
  private orgUrl = `${environment.apiUrl}/api/organization/`;
  private token = JSON.parse(localStorage.getItem("currentUser")).access;
  constructor(private httpClient: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: ` Bearer ${this.token}`
    })
  };
  getOrganizationInfo(): Observable<organization> {
    return this.httpClient.get<organization>(this.orgUrl, this.httpOptions);
  }
}
