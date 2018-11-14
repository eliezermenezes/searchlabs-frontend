import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';

import { ClassComponent } from './class.component';
import { FormComponent } from './form/form.component';
import { DetailComponent } from './detail/detail.component';
import { ClassRoutingModule } from './class.routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        ClassRoutingModule,
        FontAwesomeModule,
        SharedModule,
        ReactiveFormsModule
    ],
    declarations: [
        ClassComponent,
        FormComponent,
        DetailComponent
    ]
})
export class ClassModule { }
