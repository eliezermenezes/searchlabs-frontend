import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Resource } from 'src/app/shared/models/resource.model';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { ToastrService } from 'ngx-toastr';
import { EventsService } from 'src/app/shared/services/event.service';
import { ResourceService } from './../resource.service';

@Component({
    selector: 'app-resource-form',
    templateUrl: './resource-form.component.html',
    styleUrls: ['./resource-form.component.scss'],
    providers: [ResourceService]
})
export class ResourceFormComponent implements OnInit {

    @Input() laboratory: number;
    @Output() feedBackSon = new EventEmitter();

    public formulario: FormGroup;
    public resource: Resource;

    constructor(
        private utils: UtilsService,
        private formBuilder: FormBuilder,
        private resourceService: ResourceService,
        private toastr: ToastrService,
        private router: Router,
        private routerActive: ActivatedRoute,
        private events: EventsService
    ) { }

    ngOnInit() {
        this.resource = new Resource();
        this.inicializeFormulario();
    }

    public inicializeFormulario() {
        this.formulario = this.formBuilder.group({
            laboratory_id: [this.laboratory],
            description: [this.resource.description, Validators.required],
            quantity: [this.resource.quantity]
        });
    }
    public onSubmit() {

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
                this.feedBackSon.emit('REFRESH-RESOURCES');

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
                this.toastr.success("Recurso atualizado", "Sucesso");
            } else {
                this.toastr.error("Recurso não atualizado", "Erro");
            }
        } catch (e) {
            console.log(e);
            this.toastr.error("Recurso não atualizado", "Erro");
        }
    }
}
