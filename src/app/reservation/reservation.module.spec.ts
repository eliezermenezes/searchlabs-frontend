import { ReservationModule } from './reservation.module';

describe('ReservationModule', () => {
  let reservationModule: ReservationModule;

  beforeEach(() => {
    reservationModule = new ReservationModule();
  });

  it('should create an instance', () => {
    expect(reservationModule).toBeTruthy();
  });
});
