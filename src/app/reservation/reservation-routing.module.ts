import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservationComponent } from './reservation.component';

const reservationRoutes: Routes = [
  { path: 'reservations', component: ReservationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(reservationRoutes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
