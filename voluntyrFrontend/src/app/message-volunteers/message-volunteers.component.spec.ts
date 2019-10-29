import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageVolunteersComponent } from './message-volunteers.component';

describe('MessageVolunteersComponent', () => {
  let component: MessageVolunteersComponent;
  let fixture: ComponentFixture<MessageVolunteersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageVolunteersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageVolunteersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
