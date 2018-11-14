import { Component, OnInit, OnDestroy } from '@angular/core';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { Laboratory } from './../../shared/models/laboratory.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LaboratoryService } from '../laboratory.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    providers: [LaboratoryService]
})
export class FormComponent implements OnInit, OnDestroy {

    public formulario: FormGroup;

    public laboratory: Laboratory;
    public subscribe: Subscription;

    constructor(
        private utils: UtilsService,
        private formBuilder: FormBuilder,
        private laboratoryService: LaboratoryService,
        private toastr: ToastrService,
        private router: Router,
        private routerActive: ActivatedRoute
    ) { }

    async ngOnInit() {

        this.laboratory = new Laboratory();

        this.inicializeForm();

        this.subscribe = await this.routerActive.params.subscribe((params: any) => {
            let labId = params['id'];
            if (labId) {
                this.utils.eventAlterHeader('Editar laboratório');
                this.get(labId);
            } else {
                this.utils.eventAlterHeader('Cadastrar laboratório');
            }
        });
    }

    public inicializeForm() {

        this.formulario = this.formBuilder.group({
            name: [this.laboratory.name, Validators.required],
            localization: [this.laboratory.localization],
            observation: [this.laboratory.observation]
        });
    }

    public onSubmit() {

        if (!this.laboratory.id) {
            this.save();
        } else {
            this.update();
        }
    }

    public async get(id: number) {
        try {
            let laboratory = await this.laboratoryService.getById(id);
            if (laboratory) {
                this.laboratory = Object.assign(new Laboratory(), laboratory);
                this.inicializeForm();
            }
        } catch (e) {
            console.log(e);
        }
    }

    public async save() {
        try {
            const labCreated = await this.laboratoryService.create(this.formulario.value);
            if (labCreated) {
                this.router.navigate(['laboratories']);
                this.toastr.success(this.utils.typeEvent.CREATED_LAB_SUCCESS, "Sucesso");
            } else {
                this.toastr.error(this.utils.typeEvent.CREATED_LAB_ERROR, "Erro");
            }
        } catch (e) {
            console.log(e);
            this.toastr.error(this.utils.typeEvent.CREATED_LAB_ERROR, "Erro");
        }
    }

    public async update() {
        try {
            const labUpdated = await this.laboratoryService.update(this.laboratory.id, this.formulario.value);
            if (labUpdated) {
                this.router.navigate(['laboratories']);
                this.toastr.success("Laboratório atualizado", "Sucesso");
            } else {
                this.toastr.error(this.utils.typeEvent.CREATED_LAB_ERROR, "Erro");
            }
        } catch (e) {
            console.log(e);
            this.toastr.error(this.utils.typeEvent.CREATED_LAB_ERROR, "Erro");
        }
    }

    ngOnDestroy() {
        this.subscribe.unsubscribe();
    }
}
