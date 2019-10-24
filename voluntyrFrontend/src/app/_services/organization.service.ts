import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { organization } from "../_models/organization";
import { Observable } from "rxjs";
import { Event } from "@app/_models/Event";
import { environment } from "@environments/environment";
@Injectable({
  providedIn: "root"
})
export class OrganizationService {
  private baseurl = `${environment.apiUrl}/api/`;
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
  createNewEvent(payloaddata: Event) {
    let msg;
    this.httpClient
      .post(this.baseurl + "organization/event/", payloaddata, this.httpOptions)
      .subscribe(resp => {
        if (resp === 201) {
          msg = "sucessfully created event";
        } else {
          msg = "Unable to create event";
        }
      });
    return msg;
  }
}
