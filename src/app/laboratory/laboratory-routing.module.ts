import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LaboratoryComponent } from './laboratory.component';
import { FormComponent } from './form/form.component';

const laboratoryRoutes: Routes = [
    { path: 'laboratories', component: LaboratoryComponent },
    { path: 'laboratories/add', component: FormComponent },
    { path: 'laboratories/:id/editar', component: FormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(laboratoryRoutes)],
    exports: [RouterModule]
})
export class LaboratoryRoutingModule { }
