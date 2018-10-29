import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitationRoutingModule } from './solicitation-routing.module';

import { SolicitationComponent } from './solicitation.component';


@NgModule({
  imports: [
    CommonModule,
    SolicitationRoutingModule
  ],
  declarations: [SolicitationComponent]
})
export class SolicitationModule { }
