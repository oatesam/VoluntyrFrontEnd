import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DualauthComponent } from './dualauth.component';

describe('DualauthComponent', () => {
  let component: DualauthComponent;
  let fixture: ComponentFixture<DualauthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DualauthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DualauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
