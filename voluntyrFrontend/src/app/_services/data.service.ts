import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private precheckedemail = new BehaviorSubject('');
  checkedemail = this.precheckedemail.asObservable();

  constructor() { }

  changeCheckedEmail(email: string) {
    this.precheckedemail.next(email);
  }
}
