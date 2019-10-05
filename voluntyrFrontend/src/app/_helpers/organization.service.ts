import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { organization } from "../organizer-dashboard/organization";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class OrganizationService {
  private baseurl = "http://localhost:8000/api/organization_info/";
  s;
  constructor(private httpClient: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: ` Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTcwMzQxMzU2LCJqdGkiOiIzMDQxNjkyYjYwNzU0NWM1OTU2OTc5ZmIwMjM2MjhjZSIsInVzZXJfaWQiOjIsInNjb3BlIjoib3JnYW5pemF0aW9uIn0.pWiDRe7zWEFc-RMOqUWfTZgT2loFvZGCXYzKcBie0cQ`
    })
  };
  getOrganizationInfo(): Observable<organization[]> {
    return this.httpClient.get<organization[]>(this.baseurl, this.httpOptions);
  }
}
