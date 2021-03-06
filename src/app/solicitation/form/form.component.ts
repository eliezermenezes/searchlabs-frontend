import { LaboratoryService } from './../../laboratory/laboratory.service';
import { Laboratory } from './../../shared/models/laboratory.model';
import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { SolicitationService } from '../solicitation.service';
import { Solicitation } from 'src/app/shared/models/solicitation.model';
import { BaseFormComponent } from 'src/app/shared/components/base-form/base-form.component';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClassService } from './../../class/class.service';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Schedule } from './../../shared/interface/schedule';
import { DaysWeek } from './../../shared/interface/days_week';
import { Class } from 'src/app/shared/models/class.model';
import { MessageRequest } from '../../shared/components/confirm/message-request';

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

    public msg: MessageRequest = new MessageRequest();

    constructor(
        private formBuilder: FormBuilder,
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

        this.utils.alterHeader((this.isEditMode ? 'Alterar ' : 'Nova ') + this.titlePage, true);

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

    public async save(valuesSubmit: Solicitation) {
        try {
            const solicitationCreated = await this.solicitationService.create(valuesSubmit);
            if (solicitationCreated) {
                this.router.navigate(['solicitations']);
                this.utils.rollbackSuccess(this.msg.registed_solicitation);
            } else {
                this.utils.rollbackError(this.msg.create_error);
            }
        } catch (e) {
            console.log(e);
            this.utils.rollbackError(this.msg.error_request);
        }
    }

    public async update(valuesSubmit: Solicitation) {
        try {
            const solicitationUpdated = await this.solicitationService.update(this.solicitation.id, valuesSubmit);
            if (solicitationUpdated) {
                this.router.navigate(['solicitations']);
                this.utils.rollbackSuccess(this.msg.updated_solicitation);
            } else {
                this.utils.rollbackError(this.msg.alter_error);
            }
        } catch (e) {
            console.log(e);
            this.utils.rollbackError(this.msg.error_request);
        }
    }

    public async submit() {

        let valuesSubmit = Object.assign({}, this.formulario.value);
        let date = {
            start: this.formattedDatePersiste(valuesSubmit.start_date),
            end: this.formattedDatePersiste(valuesSubmit.start_date),
        };

        if (valuesSubmit.repeate) {
            date.end = this.formattedDatePersiste(valuesSubmit.end_date);

            valuesSubmit = Object.assign(valuesSubmit, {
                days_week: valuesSubmit.days_week
                    .map((value, index) => value ? this.days_week_value[index] : null)
                    .filter(value => value !== null)
            });
        }

        await this.prepareSubmit(valuesSubmit, date);
    }

    private async prepareSubmit(valuesSubmit: any, date: any) {
        
        valuesSubmit = Object.assign(valuesSubmit, {
            date: date,
            repeate: valuesSubmit.repeate ? 'yes' : 'no'
        });

        const days_week = valuesSubmit.days_week.join();
        valuesSubmit.days_week = days_week;

        delete valuesSubmit.start_date;
        delete valuesSubmit.end_date;

        if (valuesSubmit.repeate === 'no') {
            delete valuesSubmit.days_week;
        }

        if (this.isEditMode) {
            await this.update(valuesSubmit);
        } else {
            await this.save(valuesSubmit);
        }
    }

    public async defineDataFormGroup(solicitation?: Solicitation) {
        let repeate = solicitation ? solicitation.repeate === 'yes' : false;

        let dataForm = {
            laboratory: solicitation ? solicitation.laboratory : null,
            class: solicitation ? solicitation.class : null,
            start_date: solicitation ? this.formattedDate(solicitation.start_date) : this.formattedDate(),
            end_date: solicitation ? this.formattedDate(solicitation.end_date) : null,
            repeate: solicitation ? solicitation.repeate === 'yes' : false,
            days_week: solicitation ? this.buildCheckboxsDaysWeek(repeate) : this.buildCheckboxsDaysWeek(),
            schedule: solicitation ? { start: solicitation.start_hour, end: solicitation.end_hour } : null,
            observation: solicitation ? solicitation.observation : null
        };

        await this.createFormGroup(dataForm);
    }

    private async createFormGroup(dataForm: any) {

        this.formulario = await this.formBuilder.group({
            laboratory: [dataForm.laboratory, this.required()],
            class: [dataForm.class, this.required()],
            start_date: [dataForm.start_date, this.required()],
            end_date: [dataForm.end_date],
            repeate: [dataForm.repeate],
            days_week: dataForm.days_week,
            schedule: [dataForm.schedule, this.required()],
            observation: dataForm.observation
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
            const classes = await this.classService.getOnlyClasses();
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

    public compareSchedules(obj1: Schedule, obj2: Schedule) {
        return (obj1 && obj2) ? (obj1.start === obj2.start && obj1.end === obj2.end) : obj1 === obj2;
    }
}
