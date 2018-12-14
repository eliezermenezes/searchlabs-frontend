import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from './../shared/shared.module';

import { UserComponent } from './user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { ProfileComponent } from './profile/profile.component';
import { DetailComponent } from './detail/detail.component';

import { TextMaskModule } from 'angular2-text-mask';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        UserRoutingModule,
        SharedModule,
        FontAwesomeModule,
        TextMaskModule,
        NgbModule,
    ],
    declarations: [
        UserComponent,
        FormComponent,
        ProfileComponent,
        DetailComponent
    ]
})
export class UserModule { }
