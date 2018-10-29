import { SolicitationModule } from './solicitation.module';

describe('SolicitationModule', () => {
  let solicitationModule: SolicitationModule;

  beforeEach(() => {
    solicitationModule = new SolicitationModule();
  });

  it('should create an instance', () => {
    expect(solicitationModule).toBeTruthy();
  });
});
