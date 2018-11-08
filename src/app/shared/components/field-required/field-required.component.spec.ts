import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldRequiredComponent } from './field-required.component';

describe('FieldRequiredComponent', () => {
  let component: FieldRequiredComponent;
  let fixture: ComponentFixture<FieldRequiredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldRequiredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldRequiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
