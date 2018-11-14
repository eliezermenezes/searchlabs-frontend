import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Class } from 'src/app/shared/models/class.model';
import { Subscription } from 'rxjs';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { ClassService } from '../class.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Events } from 'src/app/shared/components/events/events';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    providers: [ClassService]
})
export class FormComponent implements OnInit {

    public formulario: FormGroup;

    public class: Class;
    public subscribe: Subscription;

    constructor(
        private utils: UtilsService,
        private formBuilder: FormBuilder,
        private classService: ClassService,
        private toastr: ToastrService,
        private router: Router,
        private routerActive: ActivatedRoute
    ) { }

    async ngOnInit() {
        this.class = new Class();
        this.inicializeForm();

        this.subscribe = await this.routerActive.params.subscribe((params: any) => {
            let lab_id = params['id'];
            if (lab_id) {
                this.utils.eventAlterHeader('Editar Classe');
                this.get(lab_id);
            } else {
                this.utils.eventAlterHeader('Nova Classe');
            }
        });
    }

    public inicializeForm() {

        this.formulario = this.formBuilder.group({
            name: [this.class.name, Validators.required],
            code: [this.class.code],
            institution: [this.class.institution]
        });
    }

    public onSubmit() {

        if (!this.class.id) {
            this.save();
        } else {
            this.update();
        }
    }

    public async get(id: number) {
        try {
            let classe = await this.classService.getById(id);
            if (classe) {
                this.class = Object.assign(new Class(), classe);
                this.inicializeForm();
            }
        } catch (e) {
            console.log(e);
        }
    }

    public async save() {
        try {
            const classCreated = await this.classService.create(this.formulario.value);
            if (classCreated) {
                this.router.navigate(['classes']);
                this.toastr.success("Classe adicionada", "Sucesso");
            } else {
                this.toastr.error("Não foi possível criar a classe", "Erro");
            }
        } catch (e) {
            console.log(e);
            this.toastr.error("Erro ao processar requisição", "Erro");
        }
    }

    public async update() {
        try {
            const classUpdated = await this.classService.update(this.class.id, this.formulario.value);
            if (classUpdated) {
                this.router.navigate(['classes']);
                this.toastr.success("Classe atualizada", "Sucesso");
            } else {
                this.toastr.error("Não foi possível editar a classe", "Erro");
            }
        } catch (e) {
            console.log(e);
            this.toastr.error("Erro ao processar requisição", "Erro");
        }
    }

    ngOnDestroy() {
        this.subscribe.unsubscribe();
    }

}
