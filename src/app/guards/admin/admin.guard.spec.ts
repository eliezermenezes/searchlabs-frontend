import { TestBed } from '@angular/core/testing';

import { LaboratoryGuard } from './admin.guard';

describe('LaboratoryGuard', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LaboratoryGuard = TestBed.get(LaboratoryGuard);
    expect(service).toBeTruthy();
  });
});
