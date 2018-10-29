import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupationMapComponent } from './occupation-map.component';

describe('OccupationMapComponent', () => {
  let component: OccupationMapComponent;
  let fixture: ComponentFixture<OccupationMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccupationMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccupationMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
