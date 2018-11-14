import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitationRoutingModule } from './solicitation-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';

import { SolicitationComponent } from './solicitation.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    SolicitationRoutingModule,
    SharedModule,
    NgbModule
  ],
  declarations: [SolicitationComponent, FormComponent]
})
export class SolicitationModule { }
