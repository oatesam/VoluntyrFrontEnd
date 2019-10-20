import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { organization } from "../_models/organization";
import { Observable } from "rxjs";
import { event } from "../organizer-dashboard/event";
import { environment } from "@environments/environment";
@Injectable({
  providedIn: "root"
})
export class OrganizationService {
  private baseurl = `${environment.apiUrl} + "/api/"`;
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
      .post(this.baseurl + "organization/event/", payloaddata, this.httpOptions)
      .subscribe(resp => {
        if (resp === 200) {
          return "sucess";
        } else {
          return "Unable to create event";
        }
      });
  }
}
