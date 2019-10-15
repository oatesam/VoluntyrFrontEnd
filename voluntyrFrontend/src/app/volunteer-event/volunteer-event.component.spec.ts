import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerEventComponent } from './volunteer-event.component';

describe('VolunteerEventComponent', () => {
  let component: VolunteerEventComponent;
  let fixture: ComponentFixture<VolunteerEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteerEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
