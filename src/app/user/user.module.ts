import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from './../shared/shared.module';

import { UserComponent } from './user.component';

@NgModule({
    imports: [
        CommonModule,
        UserRoutingModule,
        SharedModule,
        FontAwesomeModule
    ],
    declarations: [
        UserComponent
    ]
})
export class UserModule { }
