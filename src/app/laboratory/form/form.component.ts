import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { Laboratory } from './../../shared/models/laboratory.model';
import { FormBuilder } from '@angular/forms';
import { LaboratoryService } from '../laboratory.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseFormComponent } from 'src/app/shared/components/base-form/base-form.component';
import { MessageRequest } from '../../shared/components/confirm/message-request';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    providers: [LaboratoryService]
})
export class FormComponent extends BaseFormComponent implements OnInit {

    public laboratory: Laboratory;
    public titlePage: string = 'Laboratório';
    public msg: MessageRequest = new MessageRequest();

    constructor(
        private utils: UtilsService,
        private formBuilder: FormBuilder,
        private laboratoryService: LaboratoryService,
        private router: Router,
        protected routerActive: ActivatedRoute
    ) {
        super(routerActive);
    }

    async ngOnInit() {

        this.loading = true;
        this.laboratory = new Laboratory();
        this.verifyEditMode();
        this.utils.alterHeader((this.isEditMode ? 'Alterar ' : 'Novo ') + this.titlePage, true);

        await this.defineDataFormGroup();
        this.loading = false;
    }

    public async defineDataFormGroup(laboratory?: Laboratory) {

        let dataForm = {
            name: laboratory ? laboratory.name : null,
            localization: laboratory ? laboratory.localization : null,
            observation: laboratory ? laboratory.observation : null
        };

        await this.createFormGroup(dataForm);
    }

    private async createFormGroup(dataForm: any) {

        this.formulario = await this.formBuilder.group({
            name: [dataForm.name, this.required()],
            localization: [dataForm.localization],
            observation: [dataForm.observation]
        });
    }

    public async get(id: number) {
        try {
            let laboratory = await this.laboratoryService.getById(id);
            if (laboratory) {
                this.laboratory = laboratory;
                await this.defineDataFormGroup(this.laboratory);
            }
        } catch (e) {
            console.log(e);
        }
    }

    protected async submit() {

        let valuesSubmit = Object.assign({}, this.formulario.value);

        if (this.isEditMode) {
            await this.update(valuesSubmit);
        } else {
            await this.save(valuesSubmit);
        }
    }

    public async save(valuesSubmit: Laboratory) {
        try {
            const labCreated = await this.laboratoryService.create(valuesSubmit);
            if (labCreated) {
                this.router.navigate(['laboratories']);
                this.utils.rollbackSuccess(this.msg.create_success);
            } else {
                this.utils.rollbackError(this.msg.create_error);
            }
        } catch (e) {
            console.log(e);
            this.utils.rollbackError(this.msg.refuse_error);
        }
    }

    public async update(valuesSubmit: Laboratory) {
        try {
            const labUpdated = await this.laboratoryService.update(this.laboratory.id, valuesSubmit);
            if (labUpdated) {
                this.router.navigate(['laboratories']);
                this.utils.rollbackSuccess(this.msg.alter_success);
            } else {
                this.utils.rollbackError(this.msg.alter_error);
            }
        } catch (e) {
            console.log(e);
            this.utils.rollbackError(this.msg.error_request);
        }
    }
}
