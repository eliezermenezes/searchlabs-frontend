import { LaboratoryService } from './../../laboratory/laboratory.service';
import { Laboratory } from './../../shared/models/laboratory.model';
import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { SolicitationService } from '../solicitation.service';
import { Solicitation } from 'src/app/shared/models/solicitation.module';
import { BaseFormComponent } from 'src/app/shared/components/base-form/base-form.component';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClassService } from './../../class/class.service';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Schedule } from './../../shared/interface/schedule';
import { DaysWeek } from './../../shared/interface/days_week';
import { Class } from 'src/app/shared/models/class.model';


@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    providers: [SolicitationService, {
        provide: NgbDateAdapter,
        useClass: NgbDateNativeAdapter
    }]
})
export class FormComponent extends BaseFormComponent implements OnInit {

    public days_week: DaysWeek[];
    public days_week_value: Array<string>;
    public schedules: Schedule[];

    public solicitation: Solicitation;
    public classes: Class[];
    public laboratories: Laboratory[];
    public titlePage: string = 'Solicitação de Reserva';

    constructor(
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private utils: UtilsService,
        private router: Router,
        private solicitationService: SolicitationService,
        private classService: ClassService,
        private laboratoryService: LaboratoryService,
        protected routerActive: ActivatedRoute
    ) {
        super(routerActive);
    }

    async ngOnInit() {
        this.loading = true;
        this.solicitation = new Solicitation();

        await this.changeLaboratories();
        await this.changeClasses();
        await this.changeDaysWeek();
        await this.changeSchedules();
        await this.verifyEditMode();

        this.utils.eventAlterHeader((this.isEditMode ? 'Alterar ' : 'Nova ') + this.titlePage);

        await this.defineDataFormGroup();
        this.loading = false;
    }

    public async get(id: number) {
        try {
            let solicitation = await this.solicitationService.getById(id);
            if (solicitation) {
                this.solicitation = solicitation;
                await this.defineDataFormGroup(this.solicitation);
                this.setDaysWeek();
            }
        } catch (e) {
            console.log(e);
        }
    }

    public async save() {
        try {
            const solicitationCreated = await this.solicitationService.create(this.formulario.value);
            if (solicitationCreated) {
                this.router.navigate(['solicitations']);
                this.toastr.success("Solicitação registrada", "Sucesso");
            } else {
                this.toastr.error("Não foi possível registrar a solicitação", "Erro");
            }
        } catch (e) {
            console.log(e);
            this.toastr.error("Erro ao processar requisição", "Erro");
        }
    }

    public async update() {
        try {
            const solicitationUpdated = await this.solicitationService.update(this.solicitation.id, this.formulario.value);
            if (solicitationUpdated) {
                this.router.navigate(['solicitations']);
                this.toastr.success("Solicitação atualizada", "Sucesso");
            } else {
                this.toastr.error("Não foi possível editar a solicitação", "Erro");
            }
        } catch (e) {
            console.log(e);
            this.toastr.error("Erro ao processar requisição", "Erro");
        }
    }

    public submit() {
        let valuesSubmit = Object.assign({}, this.formulario.value);
        valuesSubmit = Object.assign(valuesSubmit, {
            days_week: valuesSubmit.days_week
                .map((value, index) => value ? this.days_week_value[index] : null)
                .filter(value => value !== null)
        });

        console.log(valuesSubmit);
    }

    public async defineDataFormGroup(solicitation?: Solicitation) {
        let repeate = solicitation ? solicitation.repeate === 'yes' : false;

        let dataForm = {
            laboratory : solicitation ? solicitation.laboratory : null,
            class      : solicitation ? solicitation.class : null,
            startDate  : solicitation ? this.formattedDate(solicitation.start_date) : this.formattedDate(),
            endDate    : solicitation ? this.formattedDate(solicitation.end_date) : null,
            repeate    : solicitation ? solicitation.repeate === 'yes' : false,
            days_week  : solicitation ? this.buildCheckboxsDaysWeek(repeate) : this.buildCheckboxsDaysWeek(),
            schedule   : solicitation ? { start: solicitation.start_hour, end: solicitation.end_hour } : null
        };

        await this.createFormGroup(dataForm);
    }

    private async createFormGroup(dataForm: any) {
        this.formulario = await this.formBuilder.group({
            laboratory  : [dataForm.laboratory, this.required()],
            class       : [dataForm.class, this.required()],
            start_date  : [dataForm.startDate, this.required()],
            end_date    : [dataForm.endDate],
            repeate     : [dataForm.repeate],
            days_week   : dataForm.days_week,
            schedule    : [dataForm.schedule, this.required()]
        });
    }

    private async changeLaboratories() {
        try {
            const laboratories = await this.laboratoryService.getOnlyLaboratories();
            if (laboratories.length > 0) {
                this.laboratories = laboratories;
            }
        } catch (e) {
            console.log(e);
        }
    }

    private async changeClasses() {
        try {
            const classes = await this.classService.getOnlyClasses(1);
            if (classes.length > 0) {
                this.classes = classes;
            }
        } catch (e) {
            console.log(e);
        }
    }

    private async changeDaysWeek() {
        try {
            this.days_week = await this.solicitationService.getDaysWeek();
            this.days_week_value = this.days_week.map(object => {
                return object.value;
            });

        } catch (e) {
            console.log(e);
        }
    }

    private async changeSchedules() {
        try {
            this.schedules = await this.solicitationService.getSchedules();
        } catch (e) {
            console.log(e);
        }
    }

    public buildCheckboxsDaysWeek(preenched?: boolean) {

        let values;

        if (preenched) {
            const days_week_bd = this.solicitation.days_week.split(",");

            values = this.days_week_value.map(value => {
                let checked = false;
                days_week_bd.forEach(week => {
                    if (week === value) {
                        checked = true;
                    }
                });
                return new FormControl(checked);
            });
        } else {
            values = this.days_week_value.map(value => new FormControl(false));
        }
        return this.formBuilder.array(values);
    }

    public requiredMinCheckbox(min = 1) {

        const validator = (formArray: FormArray) => {
            const countChecked = formArray.controls
                .map(v => v.value)
                .reduce((count, current) => current ? count + current : count, 0);
            return countChecked >= min ? null : { required: true }

        }
        return validator;
    }

    public setDaysWeek() {

        let dateEndControl = this.formulario.controls['end_date'];
        let daysWeekArrayControl = this.formulario.controls['days_week'];

        this.formulario.value.repeate ?
            (
                dateEndControl.setValidators([Validators.required]),
                daysWeekArrayControl.setValidators(this.requiredMinCheckbox(1))
            )
            : (dateEndControl.clearValidators(), daysWeekArrayControl.clearValidators());

        dateEndControl.updateValueAndValidity();
        daysWeekArrayControl.updateValueAndValidity();
    }

    public compareLaboratories(labOne: Laboratory, labTwo: Laboratory) {
        return (labOne && labTwo) ? (labOne.id === labTwo.id && labOne.name === labTwo.name) : labOne === labTwo;
    }

    public compareClasses(classOne: Class, classTwo: Class) {
        return (classOne && classTwo) ? (classOne.id === classTwo.id && classOne.name === classTwo.name) : classOne === classTwo;
    }

    public compareSchedules(obj1: Schedule , obj2: Schedule) {
        return (obj1 && obj2) ? (obj1.start === obj2.start && obj1.end === obj2.end) : obj1 === obj2;
    }
}
