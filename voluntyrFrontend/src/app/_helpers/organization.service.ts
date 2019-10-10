import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { organization } from "../organizer-dashboard/organization";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class OrganizationService {
  private baseurl = "http://localhost:8000/api/organization/";
  s;
  constructor(private httpClient: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: ` Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTcwNjEwMjE1LCJqdGkiOiJiOTEwMjA1OTEzNmU0YWZiODJhOGZkYTg2ZmI0YjYyZCIsInVzZXJfaWQiOjIsInNjb3BlIjoib3JnYW5pemF0aW9uIn0.apFTYEkmeIWhmhJR66xJZ8kj3ob16nRiq8AvbLkNOCE`
    })
  };
  getOrganizationInfo(): Observable<organization> {
    return this.httpClient.get<organization>(this.baseurl, this.httpOptions);
  }
}
