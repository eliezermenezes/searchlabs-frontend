import { LaboratoryModule } from './laboratory.module';

describe('LaboratoryModule', () => {
  let laboratoryModule: LaboratoryModule;

  beforeEach(() => {
    laboratoryModule = new LaboratoryModule();
  });

  it('should create an instance', () => {
    expect(laboratoryModule).toBeTruthy();
  });
});
