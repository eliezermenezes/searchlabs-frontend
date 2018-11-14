import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidDateComponent } from './invalid-date.component';

describe('InvalidDateComponent', () => {
  let component: InvalidDateComponent;
  let fixture: ComponentFixture<InvalidDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvalidDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
