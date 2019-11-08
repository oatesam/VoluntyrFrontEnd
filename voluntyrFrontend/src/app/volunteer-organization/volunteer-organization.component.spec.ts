import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerOrganizationComponent } from './volunteer-organization.component';

describe('VolunteerOrganizationComponent', () => {
  let component: VolunteerOrganizationComponent;
  let fixture: ComponentFixture<VolunteerOrganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteerOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
