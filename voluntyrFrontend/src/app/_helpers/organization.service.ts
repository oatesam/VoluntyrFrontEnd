import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { organization } from "../organizer-dashboard/organization";
import { Observable } from "rxjs";
import { event } from "../organizer-dashboard/event";
@Injectable({
  providedIn: "root"
})
export class OrganizationService {
  private baseurl = "http://localhost:8000/api/";
  private token = JSON.parse(localStorage.getItem("currentUser")).access;
  constructor(private httpClient: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: ` Bearer ${this.token}`
    })
  };
  getOrganizationInfo(): Observable<organization> {
    return this.httpClient.get<organization>(
      this.baseurl + "organization/",
      this.httpOptions
    );
  }
  createNewEvent(payloaddata: event) {
    this.httpClient
      .post(
        this.baseurl + "organization/createNewEvent/",
        JSON.stringify(payloaddata),
        this.httpOptions
      )
      .toPromise()
      .then(resp => {
        return resp;
      });
  }
}
