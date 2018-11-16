import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LaboratoryComponent } from './laboratory.component';
import { FormComponent } from './form/form.component';
import { ResourceComponent } from './resources/resource.component';
import { DetailComponent } from './detail/detail.component';
import { ResourceFormComponent } from './resources/resource-form/resource-form.component';

const laboratoryRoutes: Routes = [
    { path: 'laboratories', component: LaboratoryComponent },
    { path: 'laboratories/add', component: FormComponent },
    { path: 'laboratories/:id/detail', component: DetailComponent },
    { path: 'laboratories/:id/edit', component: FormComponent }
    //{ path: 'laboratories/:id/resources', component: ResourceComponent }
];

@NgModule({
    imports: [RouterModule.forChild(laboratoryRoutes)],
    exports: [RouterModule]
})
export class LaboratoryRoutingModule { }
