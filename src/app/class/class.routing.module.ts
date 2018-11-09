import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassComponent } from './class.component';

const classRoutes: Routes = [
    { path: 'classes', component: ClassComponent }
];

@NgModule({
    imports: [RouterModule.forChild(classRoutes)],
    exports: [RouterModule]
})
export class ClassRoutingModule { }
