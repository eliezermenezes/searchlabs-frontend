import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitationComponent } from './solicitation.component';
import { FormComponent } from './form/form.component';

const solicitationRoutes: Routes = [
  { path: 'solicitations', component: SolicitationComponent },
  { path: 'solicitations/register', component: FormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(solicitationRoutes)],
  exports: [RouterModule]
})
export class SolicitationRoutingModule { }
