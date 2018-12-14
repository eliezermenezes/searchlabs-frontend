import { FormComponent } from './form/form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassComponent } from './class.component';
import { AuthGuard } from '../guards/auth/auth.guard';
import { DetailComponent } from './detail/detail.component';

const classRoutes: Routes = [
    { path: 'classes', component: ClassComponent, canActivate: [AuthGuard] },
    { path: 'classes/add', component:  FormComponent, canActivate: [AuthGuard] },
    { path: 'classes/:id/detail', component: DetailComponent, canActivate: [AuthGuard] },
    { path: 'classes/:id/edit', component: FormComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(classRoutes)],
    exports: [RouterModule]
})
export class ClassRoutingModule { }
