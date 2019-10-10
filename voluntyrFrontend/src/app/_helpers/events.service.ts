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
      Authorization: ` Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTcwNjEwMjE1LCJqdGkiOiJiOTEwMjA1OTEzNmU0YWZiODJhOGZkYTg2ZmI0YjYyZCIsInVzZXJfaWQiOjIsInNjb3BlIjoib3JnYW5pemF0aW9uIn0.apFTYEkmeIWhmhJR66xJZ8kj3ob16nRiq8AvbLkNOCE`
    })
  };
  getEventInfo(): Observable<event[]> {
    return this.httpClient.get<event[]>(this.baseurl, this.httpOptions);
  }
}
