import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LaboratoryRoutingModule } from './laboratory-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LaboratoryComponent } from './laboratory.component';
import { FormComponent } from './form/form.component';
import { ResourceComponent } from './resources/resource.component';
import { ResourceFormComponent } from './resources/resource-form/resource-form.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        LaboratoryRoutingModule,
        SharedModule,
        FontAwesomeModule,
        ReactiveFormsModule
    ],
    declarations: [
        LaboratoryComponent,
        FormComponent,
        ResourceComponent,
        ResourceFormComponent,
        DetailComponent
    ]
})
export class LaboratoryModule { }
