import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ConfirmComponent } from './components/confirm/confirm.component';
import { NoResultComponent } from './components/no-result/no-result.component';
import { FieldRequiredComponent } from './components/field-required/field-required.component';

@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule
    ],
    declarations: [
        ConfirmComponent,
        NoResultComponent,
        FieldRequiredComponent
    ],
    exports: [
        ConfirmComponent,
        NoResultComponent,
        FieldRequiredComponent
    ],
    bootstrap: [ConfirmComponent]
})
export class SharedModule { }
