import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { organization } from "../_models/organization";
import { Observable } from "rxjs";
import { Event} from '@app/_models/Event';
import { environment } from "@environments/environment";
@Injectable({
  providedIn: "root"
})
export class OrganizationService {
  private createEventUrl = `${environment.apiUrl}/api/organization/event/`;
  private organizationInfoUrl = `${environment.apiUrl}/api/organization/`;
  private organizationEventsUrl = `${environment.apiUrl}/api/organization/events/`;

  private token = JSON.parse(localStorage.getItem("currentUser")).access;

  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: ` Bearer ${this.token}`
    })
  };

  getOrganizationInfo(): Observable<organization> {
    return this.httpClient.get<organization>(
      this.organizationInfoUrl,
      this.httpOptions
    );
  }

  // TODO: Should be moved to events.service.ts
  createNewEvent(payloaddata: Event) {
    this.httpClient
      .post(this.createEventUrl, payloaddata, this.httpOptions)
      .subscribe(resp => {
        if (resp === 200) {
          return "sucess";
        } else {
          return "Unable to create event";
        }
      });
  }

  getEvents(): Observable<Event[]> {
    return this.httpClient.get<Event[]>(this.organizationEventsUrl, this.httpOptions);
  }
}
