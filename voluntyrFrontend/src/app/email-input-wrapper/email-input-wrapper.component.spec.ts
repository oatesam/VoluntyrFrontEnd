import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailInputWrapperComponent } from './email-input-wrapper.component';

describe('EmailInputWrapperComponent', () => {
  let component: EmailInputWrapperComponent;
  let fixture: ComponentFixture<EmailInputWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailInputWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailInputWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
