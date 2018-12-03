import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBaseComponent } from './detail-base.component';

describe('DetailBaseComponent', () => {
  let component: DetailBaseComponent;
  let fixture: ComponentFixture<DetailBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
