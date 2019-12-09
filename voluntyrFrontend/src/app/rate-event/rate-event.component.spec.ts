import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateEventComponent } from './rate-event.component';

describe('RateEventComponent', () => {
  let component: RateEventComponent;
  let fixture: ComponentFixture<RateEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
