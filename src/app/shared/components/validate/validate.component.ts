import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, Validators } from '@angular/forms';
import { moment } from 'ngx-bootstrap/chronos/test/chain';

@Component({
    selector: 'app-validate',
    template: '<div></div>',
})
export class ValidateComponent implements OnInit {

    protected loading: boolean;
    protected formulario: FormGroup;
    protected formatDate: string = 'YYYY-MM-DD 00:00:00';

    constructor() { }

    ngOnInit() {
    }

    protected verifyValidate(formGroup: FormGroup | FormArray) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            control.markAsDirty();

            if (control instanceof FormGroup || control instanceof FormArray) {
                this.verifyValidate(control);
            }
        });
    }

    protected verifyFieldDateFormat(field: string) {
        return this.verifyFieldTouched(field) && this.formulario.get(field).value !== null;
    }

    protected verifyFieldTouched(field: string) {
        return (
            !this.formulario.get(field).valid
            && (this.formulario.get(field).touched || this.formulario.get(field).dirty)
        );
    }

    protected verifyRequerid(field: string) {
        return (
            this.formulario.get(field).hasError('required')
            && (this.formulario.get(field).touched || this.formulario.get(field).dirty)
        );
    }

    protected applyStyles(field: string) {
        return {
            'has-error': this.verifyFieldTouched(field)
        };
    }

    protected formattedDate(date?: Date) {

        const newDate = (date ? moment(date) : moment()).format(this.formatDate);
        return new Date(newDate);
    };

    protected formattedDatePersiste(date: Date) {
        return moment(date).format('YYYY-MM-DD');
    }

    protected required() {
        return Validators.required;
    };

    protected phone() {
        return Validators.pattern('([0-9]{2}) [0-9]{1} [0-9]{4}-[0-9]{4}$');
    }

    protected email() {
        return Validators.email;
    }

}
