import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Event } from "../_models/Event";
import { Volunteer } from "../_models/Volunteer";
import { environment } from "@environments/environment";

@Injectable({
  providedIn: "root"
})
export class VolunteerService {
  constructor(private http: HttpClient) {}

  private baseurl: string = `${environment.apiUrl}/`;
  private detailsAPI: string = "api/volunteer/";
  private eventsApi: string = "api/volunteer/events/";
  private eventsSignupAPI: string = "api/events/";
  private singleeventSignupAPI: string = "api/event/";

  getDetails(token): Observable<Volunteer> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      })
    };
    return this.http.get<Volunteer>(
      this.baseurl + this.detailsAPI,
      httpOptions
    );
  }

  getEvents(token): Observable<Event[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      })
    };

    return this.http.get<Event[]>(this.baseurl + this.eventsApi, httpOptions);
  }

  getUpcomingEvents(token): Observable<Event[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      })
    };

    return this.http.get<Event[]>(
      this.baseurl + this.eventsSignupAPI,
      httpOptions
    );
  }

  signupEvents(token: any, eventId: any): Observable<any> {
    const empty = {};
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      })
    };
    return this.http.put(this.baseurl + this.singleeventSignupAPI + eventId + "/volunteer/", empty, httpOptions);
  }
}
