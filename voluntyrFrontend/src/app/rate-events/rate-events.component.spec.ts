import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateEventsComponent } from './rate-events.component';

describe('RateEventsComponent', () => {
  let component: RateEventsComponent;
  let fixture: ComponentFixture<RateEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
