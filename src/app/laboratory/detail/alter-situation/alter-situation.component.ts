import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Laboratory } from 'src/app/shared/models/laboratory.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LaboratoryService } from '../../laboratory.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { MessageRequest } from '../../../shared/components/confirm/message-request';
import { UtilsService } from '../../../shared/services/utils.service';

@Component({
    selector: 'app-alter-situation',
    templateUrl: './alter-situation.component.html',
    styleUrls: ['./alter-situation.component.scss']
})
export class AlterSituationComponent implements OnInit {

    @Input() laboratory: Laboratory;
    @Output() resp = new EventEmitter();

    public formulario: FormGroup;
    public situations: Array<Object>;
    public loading: boolean;
    public msg: MessageRequest = new MessageRequest();

    constructor(
        private formBuilder: FormBuilder,
        private laboratoryService: LaboratoryService,
        private ngxSmartModalService: NgxSmartModalService,
        private utils: UtilsService
    ) {}

    async ngOnInit() {
        this.loading = true;

        try {
            this.situations = await this.laboratoryService.situations();
        } catch (e) {
            console.log(e);
        }

        await this.inicializeFormulario();
        this.loading = false;
    }

    public async inicializeFormulario() {
        const situation = await this.setSituation();
        this.formulario = await this.formBuilder.group({
            situation: [situation, Validators.required]
        });
    }

    public async setSituation() {
        let situation = await this.situations.filter((element: any) => {
            return element.value === this.laboratory.situation;
        });

        return situation[0];
    }

    public async onSubmit() {
        if (this.formulario.valid) {
            this.cancel();

            let value = Object.assign(this.formulario.value, {
                situation: this.formulario.value.situation.value
            });

            try {
                const alterSituation = await this.laboratoryService.alterSituation(this.laboratory.id, value);
                if (alterSituation) {
                    this.utils.rollbackSuccess(this.msg.updated_item);
                    this.resp.emit(this.laboratory.id);
                } else {
                    this.utils.rollbackError(this.msg.alter_error);
                }
            } catch (e) {
                this.utils.rollbackError(this.msg.error_request);
                console.log(e);
            }
        }
    }

    public cancel() {
        this.ngxSmartModalService.get('alterSituation').close();
    }

    public compare(obj1: any, obj2: any) {
        return (obj1 && obj2) ? (obj1.value === obj2.value) : obj1 === obj2;
    }
}
