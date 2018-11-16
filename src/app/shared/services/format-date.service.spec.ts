import { TestBed } from '@angular/core/testing';

import { FormatDateService } from './format-date.service';

describe('FormatDateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormatDateService = TestBed.get(FormatDateService);
    expect(service).toBeTruthy();
  });
});
