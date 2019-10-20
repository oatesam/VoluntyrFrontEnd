import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerEventSignupComponent } from './volunteer-event-signup.component';

describe('VolunteerEventSignupComponent', () => {
  let component: VolunteerEventSignupComponent;
  let fixture: ComponentFixture<VolunteerEventSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteerEventSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerEventSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
