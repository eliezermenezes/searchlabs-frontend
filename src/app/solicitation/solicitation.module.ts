import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitationRoutingModule } from './solicitation-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';

import { SolicitationComponent } from './solicitation.component';
import { FormComponent } from './form/form.component';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    SolicitationRoutingModule,
    SharedModule
  ],
  declarations: [SolicitationComponent, FormComponent]
})
export class SolicitationModule { }
