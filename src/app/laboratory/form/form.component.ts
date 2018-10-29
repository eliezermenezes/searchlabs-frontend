import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { Laboratory } from './../../shared/models/laboratory.model';
import { Resource } from 'src/app/shared/models/resource.model';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

    public laboratory: Laboratory;
    public resources: Resource[];
    public resource: Resource;

    constructor(
        private utilsService: UtilsService
    ) { }

    ngOnInit() {

        this.laboratory = new Laboratory();
        this.resource = new Resource();
        this.resources = new Array<Resource>();

        this.utilsService.eventAlterHeader('Cadastrar laboratório');
    }

    public addResource(form) {
        this.resources.push(form.value);
    }

    public removerRes(res: Resource) {
        this.resources.splice(this.resources.indexOf(res), 1);
        console.log(this.resources);
    }

}
