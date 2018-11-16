import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../shared/services/utils.service';
import { LaboratoryService } from './laboratory.service';
import { Laboratory } from '../shared/models/laboratory.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-laboratory',
    templateUrl: './laboratory.component.html',
    styleUrls: ['./laboratory.component.scss'],
    providers: [LaboratoryService]
})
export class LaboratoryComponent implements OnInit {

    public laboratories: Laboratory[];
    public noResults: boolean;

    constructor(
        private utils: UtilsService,
        private laboratoryService: LaboratoryService,
        private router: Router
    ) { }

    ngOnInit() {
        this.utils.eventAlterHeader('Laboratórios');

        this.laboratories = new Array<Laboratory>();
        this.listLaboratories();
    }

    public async listLaboratories() {
        try {
            const laboratories = await this.laboratoryService.list();
            if (laboratories.length > 0) {
                this.laboratories = laboratories;
            } else {
                this.noResults = true;
            }
        } catch (error) {
            this.noResults = true;
            console.log(error);
        }
    }

    public goDetail(laboratory: Laboratory) {
        this.router.navigate(['laboratories/' + laboratory.id + '/detail']);
    }
}
