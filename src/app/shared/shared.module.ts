import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NoResultComponent } from './components/no-result/no-result.component';
import { FieldRequiredComponent } from './components/field-required/field-required.component';
import { ConfirmLogoutComponent } from './components/confirm-logout/confirm-logout.component';
import { ErrorRequiredComponent } from './components/error-required/error-required.component';
import { ValidateComponent } from './components/validate/validate.component';
import { InvalidDateComponent } from './components/invalid-date/invalid-date.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';

@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule,
        NgxSmartModalModule.forChild()
    ],
    declarations: [
        NoResultComponent,
        FieldRequiredComponent,
        ConfirmLogoutComponent,
        ErrorRequiredComponent,
        ValidateComponent,
        InvalidDateComponent
    ],
    exports: [
        ConfirmLogoutComponent,
        NoResultComponent,
        FieldRequiredComponent,
        ErrorRequiredComponent,
        ValidateComponent,
        InvalidDateComponent,
    ]
})
export class SharedModule { }
