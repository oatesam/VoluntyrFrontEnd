export class SearchEvent {
  id: string;
  title: string;
  start_time: Date;
  end_time: Date;
  date: Date;
  location: string;
  description: string;
  organization: {
    id: string;
    name: string;
    rating: number;
    raters: number;
  };

  constructor(title, start_time, end_time, date, location, description) {
    this.title = title;
    this.start_time = start_time;
    this.end_time = end_time;
    this.date = date;
    this.location = location;
    this.description = description;
  }
}
