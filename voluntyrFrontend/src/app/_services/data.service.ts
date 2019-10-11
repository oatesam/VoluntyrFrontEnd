import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private loggedSource = new BehaviorSubject('false');
  logged = this.loggedSource.asObservable();

  constructor() { }

  changeLogged(email: string) {
    this.loggedSource.next(email);
  }

}
