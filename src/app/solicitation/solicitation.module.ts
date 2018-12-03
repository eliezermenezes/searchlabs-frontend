import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitationRoutingModule } from './solicitation-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';
import { TooltipModule } from 'ng2-tooltip-directive';

import { SolicitationComponent } from './solicitation.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailComponent } from './detail/detail.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';

@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        SolicitationRoutingModule,
        SharedModule,
        NgbModule,
        TooltipModule,
        NgxSmartModalModule.forChild()
    ],
    declarations: [
        SolicitationComponent,
        FormComponent,
        DetailComponent
    ]
})
export class SolicitationModule { }
