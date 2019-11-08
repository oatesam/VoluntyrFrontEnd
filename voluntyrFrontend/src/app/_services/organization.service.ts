import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { organization } from "../_models/organization";
import { Observable } from "rxjs";
import { Event } from "@app/_models/Event";
import { environment } from "@environments/environment";
import {SearchEvent} from '@app/_models/SearchEvent';
@Injectable({
  providedIn: "root"
})
export class OrganizationService {
  private createEventUrl = `${environment.apiUrl}/api/organization/event/`;
  private organizationInfoUrl = `${environment.apiUrl}/api/organization/`;
  private organizationEventsUrl = `${environment.apiUrl}/api/organization/events/`;
  private editUrl = `${environment.apiUrl}/api/organization/event/`;
  private updateUrl = `${environment.apiUrl}/api/organization/updateEvent/`;

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
    return this.httpClient.post(this.createEventUrl, payloaddata, {
      headers: new HttpHeaders({
        Authorization: ` Bearer ${this.token}`
      }),
      observe: "response"
    });
  }

  getEvents(): Observable<SearchEvent[]> {
    return this.httpClient.get<SearchEvent[]>(
      this.organizationEventsUrl,
      this.httpOptions
    );
  }

  editEvent(eventId: any) {
    return this.httpClient.get<Event>(this.editUrl + eventId + '/', this.httpOptions);
  }

  updateEditedEvent(payloaddata: Event): Observable<any> {
    console.log('In updateEditedEvent', payloaddata);
    return this.httpClient.put(this.updateUrl, payloaddata, this.httpOptions);
  }
}
