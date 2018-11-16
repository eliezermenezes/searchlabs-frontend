import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Resource } from 'src/app/shared/models/resource.model';
import { ToastrService } from 'ngx-toastr';
import { EventsService } from 'src/app/shared/services/event.service';
import { ResourceService } from './../resource.service';
import { Laboratory } from 'src/app/shared/models/laboratory.model';
import { Events } from 'src/app/shared/components/events/events';

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

    constructor(
        private formBuilder: FormBuilder,
        private resourceService: ResourceService,
        private toastr: ToastrService,
        private events: EventsService,
    ) {
        this.events.on(Events.prototype.resourceEDIT, (resource: Resource) => {
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
            quantity: [this.resource.quantity]
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

                this.toastr.success("Recurso adicionado", "Sucesso");
            } else {
                this.toastr.error("Recurso não adicionado", "Erro");
            }
        } catch (e) {
            console.log(e);
            this.toastr.error("Recurso não adicionado", "Erro");
        }
    }

    public async update() {

        try {
            const resourcedated = await this.resourceService.update(this.resource.id, this.formulario.value);
            if (resourcedated) {
                this.rollbackResources();
                this.emitFeedbackForGetter();
                this.toastr.success("Recurso atualizado", "Sucesso");
            } else {
                this.toastr.error("Recurso não atualizado", "Erro");
            }
        } catch (e) {
            console.log(e);
            this.toastr.error("Recurso não atualizado", "Erro");
        }
    }

    private emitFeedbackForGetter() {
        this.feedBackSon.emit(Events.prototype.resourceREFRESH);
    }

    public rollbackResources() {
        this.isFormEdit = !this.isFormEdit;
        this.resource = Object.assign(new Laboratory());
        this.formulario.reset();
    }
}
