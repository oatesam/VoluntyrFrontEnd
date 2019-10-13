import { Component, OnInit, ViewChildren, Input } from "@angular/core";
import dayGridPlugin from "@fullcalendar/daygrid";
//import timeGrigPlugin from "@fullcalendar/timegrid";
//import interactionPlugin from "@fullcalendar/interaction"; // for dateClick

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.css"]
})
export class CalendarComponent implements OnInit {
  @Input() event: [];
  calendarPlugins = [dayGridPlugin];

  constructor() {}

  ngOnInit() {}
}
