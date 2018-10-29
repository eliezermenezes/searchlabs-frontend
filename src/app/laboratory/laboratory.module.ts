import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LaboratoryRoutingModule } from './laboratory-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

import { LaboratoryComponent } from './laboratory.component';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FormComponent } from './form/form.component';

library.add(faPlus);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LaboratoryRoutingModule,
    SharedModule,
    FontAwesomeModule
  ],
  declarations: [LaboratoryComponent, FormComponent]
})
export class LaboratoryModule { }
