import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { event } from "../organizer-dashboard/event";
import { Observable } from "rxjs";
import {environment} from '@environments/environment';
@Injectable({
  providedIn: "root"
})
export class EventsService {
  private eventsUrl = `${environment.apiUrl}/api/events/`;
  private token = JSON.parse(localStorage.getItem("currentUser")).access;
  constructor(private httpClient: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: ` Bearer ${this.token}`
    })
  };
  getEventInfo(): Observable<event[]> {
    return this.httpClient.get<event[]>(this.eventsUrl, this.httpOptions);
  }
}
