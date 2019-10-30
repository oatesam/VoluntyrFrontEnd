import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginwrapperComponent } from './loginwrapper.component';

describe('LoginwrapperComponent', () => {
  let component: LoginwrapperComponent;
  let fixture: ComponentFixture<LoginwrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginwrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginwrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
