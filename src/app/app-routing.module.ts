import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OccupationMapComponent } from './occupation-map/occupation-map.component';
import { DetailComponent } from './occupation-map/detail/detail.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './guards/auth/auth.guard';

const appRoutes: Routes = [
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: 'auth', component: AuthComponent, children: [
        { path: '', redirectTo: 'login', pathMatch: 'full' },
        { path: 'login', component: LoginComponent }
    ]},
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'occupation_map', component: OccupationMapComponent, children: [
        { path: 'laboratory/:laboratory', component: DetailComponent }
    ]}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { useHash: true, urlUpdateStrategy: 'deferred' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
