import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassComponent } from './class.component';
import { FormComponent } from './form/form.component';
import { DetailComponent } from './detail/detail.component';
import { ClassRoutingModule } from './class.routing.module';

@NgModule({
  imports: [
    CommonModule,
    ClassRoutingModule
  ],
  declarations: [ClassComponent, FormComponent, DetailComponent]
})
export class ClassModule { }
