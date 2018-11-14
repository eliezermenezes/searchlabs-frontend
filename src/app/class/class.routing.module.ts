import { FormComponent } from './form/form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassComponent } from './class.component';

const classRoutes: Routes = [
    { path: 'classes', component: ClassComponent },
    { path: 'classes/add', component:  FormComponent },
    { path: 'classes/:id/editar', component: FormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(classRoutes)],
    exports: [RouterModule]
})
export class ClassRoutingModule { }
