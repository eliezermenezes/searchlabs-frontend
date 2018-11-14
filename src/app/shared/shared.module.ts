import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ConfirmComponent } from './components/confirm/confirm.component';
import { NoResultComponent } from './components/no-result/no-result.component';
import { FieldRequiredComponent } from './components/field-required/field-required.component';
import { ConfirmLogoutComponent } from './components/confirm-logout/confirm-logout.component';
import { ErrorRequiredComponent } from './components/error-required/error-required.component';
import { ValidateComponent } from './components/validate/validate.component';
import { InvalidDateComponent } from './components/invalid-date/invalid-date.component';

@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule
    ],
    declarations: [
        ConfirmComponent,
        NoResultComponent,
        FieldRequiredComponent,
        ConfirmLogoutComponent,
        ErrorRequiredComponent,
        ValidateComponent,
        InvalidDateComponent
    ],
    exports: [
        ConfirmComponent,
        ConfirmLogoutComponent,
        NoResultComponent,
        FieldRequiredComponent,
        ErrorRequiredComponent,
        ValidateComponent,
        InvalidDateComponent
    ],
    bootstrap: [ConfirmComponent, ConfirmLogoutComponent]
})
export class SharedModule { }
