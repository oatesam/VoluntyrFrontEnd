import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualEventSummaryComponent } from './individual-event-summary.component';

describe('IndividualEventSummaryComponent', () => {
  let component: IndividualEventSummaryComponent;
  let fixture: ComponentFixture<IndividualEventSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualEventSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualEventSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
