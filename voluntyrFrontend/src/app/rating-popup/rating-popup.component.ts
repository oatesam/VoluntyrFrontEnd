import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SearchEvent} from '@app/_models/SearchEvent';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {VolunteerService} from '@app/_services/volunteer.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rating-popup',
  templateUrl: './rating-popup.component.html',
  styleUrls: ['./rating-popup.component.css']
})
export class RatingPopupComponent implements OnInit {

  @Input() event: SearchEvent;

  constructor(
    public activeModal: NgbActiveModal,
    public vs: VolunteerService
  ) { }

  ratingForm = new FormControl('', Validators.required);

  ngOnInit() {
  }

  onSubmitRating() {
    console.log("button click");
    this.vs.postEventRating(this.event.id, this.ratingForm.value).subscribe(
      data => {
        this.activeModal.close("rated");
      },
      error1 => {
        console.error(error1);
      }
    )
  }

}
