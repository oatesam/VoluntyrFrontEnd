import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../_helpers/Event';
import { Volunteer} from '../_helpers/Volunteer';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {

  constructor(private http: HttpClient) { }

  private baseurl: string = `${environment.apiUrl}/`;
  private detailsAPI: string = "api/volunteer/";
  private eventsApi: string = "api/volunteer/events/";

  getDetails(token): Observable<Volunteer> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get<Volunteer>(this.baseurl + this.detailsAPI, httpOptions);
  }

  getEvents(token): Observable<Event[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    return this.http.get<Event[]>(this.baseurl + this.eventsApi, httpOptions);
  }
}
