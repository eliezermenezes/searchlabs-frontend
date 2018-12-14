import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LaboratoryComponent } from './laboratory.component';
import { FormComponent } from './form/form.component';
import { ResourceComponent } from './resources/resource.component';
import { DetailComponent } from './detail/detail.component';
import { AuthGuard } from '../guards/auth/auth.guard';
import { AdminGuard } from '../guards/admin/admin.guard';

const laboratoryRoutes: Routes = [
    { path: 'laboratories', component: LaboratoryComponent, canActivate: [AuthGuard] },
    { path: 'laboratories/add', component: FormComponent, canActivate: [AuthGuard] },
    { path: 'laboratories/:id/detail', component: DetailComponent, canActivate: [AuthGuard] },
    { path: 'laboratories/:id/edit', component: FormComponent, canActivate: [AuthGuard] },
    { path: 'laboratories/:id/resources', component: ResourceComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(laboratoryRoutes)],
    exports: [RouterModule]
})
export class LaboratoryRoutingModule { }
