import {Injectable, Input} from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import {environment} from '@environments/environment';
import {Event} from '@app/_models/Event';

@Injectable({
  providedIn: "root"
})
export class EventsService {
  // private organizationEvents = `${environment.apiUrl}/api/organization/events/`;

  private eventsBaseUrl = `${environment.apiUrl}/api/event/`;
  // private token = JSON.parse(localStorage.getItem("currentUser")).access;
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     Authorization: ` Bearer ${this.token}`
  //   })
  // };

  constructor(private httpClient: HttpClient) {}

  // getEventInfo(): Observable<Event[]> {
  //   return this.httpClient.get<Event[]>(this.organizationEvents, this.httpOptions);
  // }

  emailVolunteers(subject: string, message: string, eventid: string): Observable<any> {
    let body = {'subject': subject, 'message': message};
    return this.httpClient.post<any>(this.eventsBaseUrl + eventid + "/email/", body);
  }
}
