import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitationComponent } from './solicitation.component';

const solicitationRoutes: Routes = [
  { path: 'solicitations', component: SolicitationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(solicitationRoutes)],
  exports: [RouterModule]
})
export class SolicitationRoutingModule { }
