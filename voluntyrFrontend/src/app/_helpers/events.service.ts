import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { event } from "../organizer-dashboard/event";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class EventsService {
  private baseurl = "http://localhost:8000/api/events";
  constructor(private httpClient: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: ` Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTcwMTU1Nzg0LCJqdGkiOiI5YzRhMTEzZmQ4ZDI0YWQ0YjIwZmE5NWQyYjVhODhmZCIsInVzZXJfaWQiOjIsInNjb3BlIjoib3JnYW5pemF0aW9uIn0.OEhdlNF4I34rlXudT0bebX3NJ2SGWmfPn3SlgUhtcqU`
    })
  };
  getEventInfo(): Observable<event[]> {
    return this.httpClient.get<event[]>(
      this.baseurl + "?organization_id=2",
      this.httpOptions
    );
  }
}
