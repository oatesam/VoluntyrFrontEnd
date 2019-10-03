import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { organization } from "../organizer-dashboard/organization";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class OrganizationService {
  private baseurl = "http://localhost:8000/api/organization_info";
  s;
  constructor(private httpClient: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: ` Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTcwMTU1Nzg0LCJqdGkiOiI5YzRhMTEzZmQ4ZDI0YWQ0YjIwZmE5NWQyYjVhODhmZCIsInVzZXJfaWQiOjIsInNjb3BlIjoib3JnYW5pemF0aW9uIn0.OEhdlNF4I34rlXudT0bebX3NJ2SGWmfPn3SlgUhtcqU`
    })
  };
  getOrganizationInfo(): Observable<organization[]> {
    return this.httpClient.get<organization[]>(
      this.baseurl + "?end_user_id=2",
      this.httpOptions
    );
  }
}
