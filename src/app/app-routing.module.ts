import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { OccupationMapComponent } from './occupation-map/occupation-map.component';
import { SigninComponent } from './signin/signin.component';

const appRoutes: Routes = [
    { path: '',  redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: SigninComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'occupation_map', component: OccupationMapComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { useHash: true, urlUpdateStrategy: 'deferred' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
