import { TestBed } from '@angular/core/testing';

import { TeacherGuardService } from './teacher-guard.service';

describe('TeacherGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeacherGuardService = TestBed.get(TeacherGuardService);
    expect(service).toBeTruthy();
  });
});
