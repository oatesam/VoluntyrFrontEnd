import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { event } from "../organizer-dashboard/event";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class EventsService {
  private baseurl = "http://localhost:8000/api/events/";
  constructor(private httpClient: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: ` Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTcwMzQxMzU2LCJqdGkiOiIzMDQxNjkyYjYwNzU0NWM1OTU2OTc5ZmIwMjM2MjhjZSIsInVzZXJfaWQiOjIsInNjb3BlIjoib3JnYW5pemF0aW9uIn0.pWiDRe7zWEFc-RMOqUWfTZgT2loFvZGCXYzKcBie0cQ`
    })
  };
  getEventInfo(): Observable<event[]> {
    return this.httpClient.get<event[]>(this.baseurl, this.httpOptions);
  }
}
