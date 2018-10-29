import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationRoutingModule } from './reservation-routing.module';

import { ReservationComponent } from './reservation.component';

@NgModule({
  imports: [
    CommonModule,
    ReservationRoutingModule
  ],
  declarations: [ReservationComponent]
})
export class ReservationModule { }
