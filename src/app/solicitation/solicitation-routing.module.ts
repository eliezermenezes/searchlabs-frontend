import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitationComponent } from './solicitation.component';
import { FormComponent } from './form/form.component';
import { DetailComponent } from './detail/detail.component';

const path_base = `solicitations`;

const solicitationRoutes: Routes = [
    { path: `solicitations`, component: SolicitationComponent },
    { path: `solicitations/register`, component: FormComponent },
    { path: `solicitations/:id/detail`, component: DetailComponent },
    { path: `solicitations/:id/edit`, component: FormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(solicitationRoutes)],
    exports: [RouterModule]
})
export class SolicitationRoutingModule { }
