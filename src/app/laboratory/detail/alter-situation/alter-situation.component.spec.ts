import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterSituationComponent } from './alter-situation.component';

describe('AlterSituationComponent', () => {
  let component: AlterSituationComponent;
  let fixture: ComponentFixture<AlterSituationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlterSituationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterSituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
