import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleEventWrapperComponent } from './single-event-wrapper.component';

describe('SingleEventWrapperComponent', () => {
  let component: SingleEventWrapperComponent;
  let fixture: ComponentFixture<SingleEventWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleEventWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleEventWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
