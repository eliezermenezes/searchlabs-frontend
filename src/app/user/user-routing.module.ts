import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { FormComponent } from './form/form.component';
import { AuthGuard } from '../guards/auth/auth.guard';
import {ProfileComponent} from './profile/profile.component';
import { DetailComponent } from './detail/detail.component';

const userRoutes: Routes = [
    { path: 'users', component: UserComponent, canActivate: [AuthGuard] },
    { path: 'users/add', component: FormComponent, canActivate: [AuthGuard] },
    { path: 'users/profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'users/profile/edit/:id', component: FormComponent, canActivate: [AuthGuard] },
    { path: 'users/:id/detail', component: DetailComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(userRoutes)],
    exports: [RouterModule]
})
export class UserRoutingModule {
}
