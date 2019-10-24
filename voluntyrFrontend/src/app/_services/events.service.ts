import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import {environment} from '@environments/environment';
import {Event} from '@app/_models/Event';

@Injectable({
  providedIn: "root"
})
export class EventsService {
  private organizationEvents = `${environment.apiUrl}/api/organization/events/`;
  private token = JSON.parse(localStorage.getItem("currentUser")).access;
  constructor(private httpClient: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: ` Bearer ${this.token}`
    })
  };
  getEventInfo(): Observable<Event[]> {
    return this.httpClient.get<Event[]>(this.organizationEvents, this.httpOptions);
  }
}
