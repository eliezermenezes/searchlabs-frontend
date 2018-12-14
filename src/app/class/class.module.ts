import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';

import { ClassComponent } from './class.component';
import { FormComponent } from './form/form.component';
import { DetailComponent } from './detail/detail.component';
import { ClassRoutingModule } from './class.routing.module';
import { SharedModule } from '../shared/shared.module';
import { TabsModule } from 'ngx-bootstrap';
import { TopicsComponent } from './topics/topics.component';
import { TopicFormComponent } from './topics/topic-form/topic-form.component';

@NgModule({
    imports: [
        CommonModule,
        ClassRoutingModule,
        FontAwesomeModule,
        SharedModule,
        ReactiveFormsModule,
        TabsModule.forRoot()
    ],
    declarations: [
        ClassComponent,
        FormComponent,
        DetailComponent,
        TopicsComponent,
        TopicFormComponent
    ]
})
export class ClassModule { }
