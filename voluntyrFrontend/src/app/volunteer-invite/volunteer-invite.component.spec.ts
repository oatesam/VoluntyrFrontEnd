import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerInviteComponent } from './volunteer-invite.component';

describe('VolunteerInviteComponent', () => {
  let component: VolunteerInviteComponent;
  let fixture: ComponentFixture<VolunteerInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteerInviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
