import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Class } from 'src/app/shared/models/class.model';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { ClassService } from '../class.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseFormComponent } from '../../shared/components/base-form/base-form.component';
import { MessageRequest } from '../../shared/components/confirm/message-request';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    providers: [ClassService]
})
export class FormComponent extends BaseFormComponent implements OnInit {

    public class: Class;
    public titlePage: string = 'Turma';
    public msg: MessageRequest = new MessageRequest();

    constructor(
        private utils: UtilsService,
        private formBuilder: FormBuilder,
        private classService: ClassService,
        private router: Router,
        protected routerActive: ActivatedRoute
    ) {
        super(routerActive);
    }

    async ngOnInit() {
        this.loading = true;
        this.class = new Class();

        this.verifyEditMode();
        this.utils.alterHeader((this.isEditMode ? 'Alterar ' : 'Nova ') + this.titlePage, true);

        await this.defineDataFormGroup();
        this.loading = false;
    }

    public async defineDataFormGroup(classe?: Class) {

        let dataForm = {
            name: classe ? classe.name : null,
            code: classe ? classe.code : null,
            institution: classe ? classe.institution : null
        };

        await this.createFormGroup(dataForm);
    }

    private async createFormGroup(dataForm: any) {

        this.formulario = await this.formBuilder.group({
            name: [dataForm.name, this.required()],
            code: [dataForm.code],
            institution: [dataForm.institution]
        });
    }

    public async get(id: number) {
        try {
            let classe = await this.classService.getById(id);
            if (classe) {
                this.class = classe;
                await this.defineDataFormGroup(this.class);
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

    public async save(valuesSubmit: Class) {
        try {
            const classCreated = await this.classService.create(valuesSubmit);
            if (classCreated) {
                this.router.navigate(['classes']);
                this.utils.rollbackSuccess(this.msg.create_success);
            } else {
                this.utils.rollbackError(this.msg.create_error);
            }
        } catch (e) {
            console.log(e);
            this.utils.rollbackError(this.msg.refuse_error);
        }
    }

    public async update(valuesSubmit: Class) {
        try {
            const classUpdated = await this.classService.update(this.class.id, valuesSubmit);
            if (classUpdated) {
                this.router.navigate(['classes']);
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
