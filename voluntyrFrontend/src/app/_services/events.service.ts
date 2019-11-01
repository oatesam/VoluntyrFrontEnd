import {Injectable, Input} from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import {environment} from '@environments/environment';
import {Event} from '@app/_models/Event';

@Injectable({
  providedIn: "root"
})
export class EventsService {

  private eventsBaseUrl = `${environment.apiUrl}/api/event/`;

  constructor(private httpClient: HttpClient) {}

  emailVolunteers(subject: string, message: string, replyto: string, eventid: string): Observable<any> {
    let body = {'subject': subject, 'message': message, 'replyto': replyto};
    return this.httpClient.post<any>(this.eventsBaseUrl + eventid + "/email/", body);
  }

  checkSignUp(eventid: string): Observable<any> {
    return this.httpClient.get<any>(this.eventsBaseUrl + eventid + "/check/");
  }
}
