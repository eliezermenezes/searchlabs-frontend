import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Resource } from 'src/app/shared/models/resource.model';
import { EventsService } from 'src/app/shared/services/event.service';
import { ResourceService } from './../resource.service';
import { Laboratory } from 'src/app/shared/models/laboratory.model';
import { UtilsService } from '../../../shared/services/utils.service';
import { MessageRequest } from '../../../shared/components/confirm/message-request';

@Component({
    selector: 'app-resource-form',
    templateUrl: './resource-form.component.html',
    styleUrls: ['./resource-form.component.scss'],
    providers: [ResourceService]
})
export class ResourceFormComponent implements OnInit {

    @Input() laboratory: Laboratory;
    @Input() resourceEdit: Resource;
    @Output() feedBackSon = new EventEmitter();

    public isFormEdit: boolean;
    public formulario: FormGroup;
    public resource: Resource;
    public msg: MessageRequest = new MessageRequest();

    constructor(
        private formBuilder: FormBuilder,
        private resourceService: ResourceService,
        private events: EventsService,
        private utils: UtilsService
    ) {
        this.events.on('_altResource', (resource: Resource) => {
            this.resource = resource;
            this.isFormEdit = true;
            this.inicializeFormulario();
        });
    }

    async ngOnInit() {
        this.resource = new Resource();
        this.inicializeFormulario();
    }

    public inicializeFormulario() {
        this.formulario = this.formBuilder.group({
            laboratory_id: [null],
            description: [this.resource.description, Validators.required],
            quantity: [this.resource.quantity, [Validators.required, Validators.min(1)]]
        });
    }

    public onSubmit() {

        this.formulario.patchValue({
            laboratory_id: this.laboratory.id
        });

        if (!this.resource.id) {
            this.save();
        } else {
            this.update();
        }
    }

    public async save() {

        try {
            const resourceCreated = await this.resourceService.create(this.formulario.value);
            if (resourceCreated) {
                this.formulario.reset();
                this.emitFeedbackForGetter();
                this.utils.rollbackSuccess(this.msg.created_item);
            } else {
                this.utils.rollbackError(this.msg.create_error);
            }
        } catch (e) {
            console.log(e);
            this.utils.rollbackError(this.msg.error_request);
        }
    }

    public async update() {

        try {
            const resourcedated = await this.resourceService.update(this.resource.id, this.formulario.value);
            if (resourcedated) {
                this.rollbackResources();
                this.emitFeedbackForGetter();
                this.utils.rollbackSuccess(this.msg.updated_item);
            } else {
                this.utils.rollbackError(this.msg.alter_error);
            }
        } catch (e) {
            console.log(e);
            this.utils.rollbackError(this.msg.error_request);
        }
    }

    private emitFeedbackForGetter() {
        this.feedBackSon.emit('_refreshResource');
    }

    public rollbackResources() {
        this.isFormEdit = !this.isFormEdit;
        this.resource = Object.assign(new Laboratory());
        this.formulario.reset();
    }
}
