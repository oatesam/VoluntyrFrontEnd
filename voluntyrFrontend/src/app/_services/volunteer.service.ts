import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Event } from "../_models/Event";
import { Volunteer } from "../_models/Volunteer";
import { environment } from "@environments/environment";
import { SearchEvent } from "@app/_models/SearchEvent";
import { VolunteerOrganziation } from "@app/_models/VolunteerOrganziation";

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
  private organizaionAPI: string = "api/organization/";

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

  getEvents(token): Observable<SearchEvent[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      })
    };

    return this.http.get<SearchEvent[]>(
      this.baseurl + this.eventsApi,
      httpOptions
    );
  }

  getUnratedEvent(): Observable<SearchEvent[]> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + token
    //   })
    // };

    return this.http.get<SearchEvent[]>(
      this.baseurl + "api/volunteer/events/unrated/"
    );
  }

  getUpcomingEvents(token): Observable<SearchEvent[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      })
    };

    return this.http.get<SearchEvent[]>(
      this.baseurl + this.eventsSignupAPI,
      httpOptions
    );
  }

  searchEvents(
    token,
    start_time,
    end_time,
    title,
    keyword,
    location,
    orgName
  ): Observable<SearchEvent[]> {
    var params = new HttpParams();
    if (start_time !== null && start_time !== "") {
      params = params.append("start_time", start_time);
    }
    if (end_time !== null && end_time !== "") {
      params = params.append("end_time", end_time);
    }
    if (title !== null && title !== "") {
      params = params.append("title", title);
    }
    if (keyword !== null && keyword !== "") {
      params = params.append("keyword", keyword);
    }
    if (location !== null && location !== "") {
      params = params.append("location", location);
    }
    if (orgName !== null && orgName !== "") {
      params = params.append("orgName", orgName);
    }
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }),
      params: params
    };
    return this.http.get<SearchEvent[]>(
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
    return this.http.put(
      this.baseurl + this.singleeventSignupAPI + eventId + "/volunteer/",
      empty,
      httpOptions
    );
  }

  getOrganization(orgid: string): Observable<VolunteerOrganziation> {
    return this.http.get<VolunteerOrganziation>(
      this.baseurl + this.organizaionAPI + orgid + "/"
    );
  }
}
