import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ValidateComponent } from '../validate/validate.component';

@Component({
    selector: 'app-base-form',
    template: '<div></div>'
})
export abstract class BaseFormComponent extends ValidateComponent implements OnInit, OnDestroy {

    public subscribe: Subscription;
    public isEditMode: boolean = false;

    constructor(
        protected routerActive: ActivatedRoute
    ) {        
        super();
    }

    ngOnInit() { }

    protected async verifyEditMode() {
        this.subscribe = await this.routerActive.params.subscribe((params: any) => {
            if (params['id']) {
                this.isEditMode = true;
                this.get(params['id']);
            }
        });
    }

    protected onSubmit() {
        this.formulario.valid
            ? this.submit() 
            : (this.verifyValidate(this.formulario), console.log('form not valid'));
    }

    private reset() {
        this.formulario.reset();
    }

    public ngOnDestroy() {
        this.subscribe.unsubscribe();
    }

    protected abstract get(id: number);
    protected abstract submit();
}
