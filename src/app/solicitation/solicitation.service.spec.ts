import { TestBed } from '@angular/core/testing';

import { SolicitationService } from './solicitation.service';

describe('SolicitationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SolicitationService = TestBed.get(SolicitationService);
    expect(service).toBeTruthy();
  });
});
