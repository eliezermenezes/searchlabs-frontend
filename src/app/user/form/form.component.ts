import { Component, OnInit } from '@angular/core';
import { MessageRequest } from '../../shared/components/confirm/message-request';
import { UtilsService } from '../../shared/services/utils.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormComponent } from '../../shared/components/base-form/base-form.component';
import { UserService } from '../user.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent extends BaseFormComponent implements OnInit {

    public user: User;
    public roles: Array<Object>;
    public msg: MessageRequest = new MessageRequest();
    public genders: Array<Object>;

    constructor(
        private utils: UtilsService,
        private formBuilder: FormBuilder,
        private userService: UserService,
        private router: Router,
        protected routerActive: ActivatedRoute
    ) {
        super(routerActive);
    }

    async ngOnInit() {

        this.loading = true;
        this.user = new User();
        this.roles = this.userService.roles();
        this.genders = this.userService.genders();
        this.verifyEditMode();
        this.utils.alterHeader((this.isEditMode ? 'Alterar dados do meu perfil' : 'Novo Usuário'), true);

        await this.defineDataFormGroup();
        this.loading = false;
    }

    public async defineDataFormGroup(usuario?: User) {
        let dataForm = {
            username: usuario ? usuario.username : null,
            name: usuario ? usuario.name : null,
            family_name: usuario ? usuario.family_name : null,
            role: usuario ? usuario.role : this.roles[0],
            phone: usuario ? usuario.phone : null,
            gender: usuario ? this.defineGender(usuario.gender) : null
        };
        await this.createFormGroup(dataForm);
    }

    private defineGender(gender: string) {
        let g = null;
        this.genders.forEach((genders: any) => {
            if (genders.value == gender) {
                g = genders;
                return;
            }
        });
        return g;
    }

    private async createFormGroup(dataForm: any) {

        this.formulario = await this.formBuilder.group({
            username: [dataForm.username, [this.required(), this.email()]],
            name: [dataForm.name, this.isEditMode ? this.required() : null],
            family_name: [dataForm.family_name, this.isEditMode ? this.required() : null],
            role: [dataForm.role, [this.required()]],
            phone: [dataForm.phone, [this.phone()]],
            gender: [dataForm.gender]
        });
    }

    public async get(id: number) {
        try {
            let user = await this.userService.getUser(id);
            if (user) {
                this.user = user;
                await this.defineDataFormGroup(this.user);
            }
        } catch (e) {
            console.log(e);
        }
    }

    protected async submit() {

        if (!this.isEditMode) {
            delete this.formulario.value.name;
            delete this.formulario.value.family_name;
            delete this.formulario.value.phone;
            delete this.formulario.value.gender;
        }

        let valuesSubmit = Object.assign({}, this.formulario.value, {
            role: this.formulario.value.role.value
        });

        if (this.isEditMode) {

            if (valuesSubmit.gender) {
                valuesSubmit.gender = valuesSubmit.gender.value;
            }

            delete valuesSubmit.username;
            delete valuesSubmit.role;

            await this.update(valuesSubmit);
        } else {
            await this.save(valuesSubmit);
        }
    }

    public async save(valuesSubmit: User) {
        try {
            const labCreated = await this.userService.create(valuesSubmit);
            if (labCreated) {
                this.router.navigate(['users']);
                this.utils.rollbackSuccess(this.msg.created_user);
            } else {
                this.utils.rollbackError(this.msg.create_error);
            }
        } catch (e) {
            console.log(e);
            this.utils.rollbackError(this.msg.error_request);
        }
    }

    public async update(valuesSubmit: User) {
        try {
            const labUpdated = await this.userService.update(this.user.id, valuesSubmit);
            if (labUpdated) {
                this.router.navigate(['/users/profile']);
                this.utils.rollbackSuccess(this.msg.updated_user);
            } else {
                this.utils.rollbackError(this.msg.alter_error);
            }
        } catch (e) {
            console.log(e);
            this.utils.rollbackError(this.msg.error_request);
        }
    }

    public compareRoles(roleOne: any, roleTwo: any) {
        return (roleOne && roleTwo) ? (roleOne.value === roleTwo.value) : roleOne === roleTwo;
    }

    public compareGenders(genderOne: any, genderTwo: any) {
        return (genderOne && genderTwo) ? (genderOne.value === genderTwo.value) : genderOne === genderTwo;
    }
}
