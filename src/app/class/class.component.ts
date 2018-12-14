import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../shared/services/utils.service';
import { Router } from '@angular/router';
import { Class } from '../shared/models/class.model';
import { ClassService } from './class.service';

@Component({
    selector: 'app-class',
    templateUrl: './class.component.html',
    styleUrls: ['./class.component.scss'],
    providers: [ClassService]
})
export class ClassComponent implements OnInit {

    public classes: Class[];
    public noResults: boolean;

    public hasPermissionOfAdmin: boolean;

    constructor(
        private utils: UtilsService,
        private classService: ClassService,
        private router: Router
    ) {}

    ngOnInit() {
        this.utils.alterHeader('Turmas cadastradas');
        this.classes = new Array<Class>();
        this.verifyPermission();
        this.listClasses();
    }

    public async listClasses() {
        try {
            const classes = await this.classService.list();
            if (classes.length > 0) {
                this.classes = classes;
            } else {
                this.noResults = true;
            }
        } catch (error) {
            this.noResults = true;
            console.log(error);
        }
    }

    public goDetail(classe: Class) {
        this.router.navigate(['classes/' + classe.id + '/detail']);
    }

    public verifyPermission() {
        this.hasPermissionOfAdmin = this.utils.hasPermissionOfAdmin();
    }
}
