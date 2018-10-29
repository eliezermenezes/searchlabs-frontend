import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmComponent } from './components/confirm/confirm.component';
import { NoResultComponent } from './components/no-result/no-result.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ConfirmComponent,
    NoResultComponent
  ],
  exports: [
    ConfirmComponent,
    NoResultComponent
  ]
})
export class SharedModule { }
