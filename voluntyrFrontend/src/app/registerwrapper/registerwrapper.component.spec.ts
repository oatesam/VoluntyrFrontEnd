import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterwrapperComponent } from './registerwrapper.component';

describe('RegisterwrapperComponent', () => {
  let component: RegisterwrapperComponent;
  let fixture: ComponentFixture<RegisterwrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterwrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterwrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
