import { Laboratory } from 'src/app/shared/models/laboratory.model';
import { LaboratoryService } from './../laboratory/laboratory.service';
import { Component, OnInit } from '@angular/core';
import { UtilsService } from './../shared/services/utils.service';

@Component({
    selector: 'app-occupation-map',
    templateUrl: './occupation-map.component.html',
    styleUrls: ['./occupation-map.component.scss']
})
export class OccupationMapComponent implements OnInit {

    public laboratories: Laboratory[];
    public noResults: boolean;

    constructor(
        private utilsService: UtilsService,
        private laboratoryService: LaboratoryService
    ) { }

    ngOnInit() {
        this.utilsService.alterHeader('Mapa de Ocupação dos Laboratórios');

        this.onlyLaboratories();
    }

    public async onlyLaboratories() {
        try {
            const laboratories = await this.laboratoryService.getOnlyLaboratories();
            if (laboratories.length > 0) {
                this.laboratories = laboratories;
            } else {
                this.noResults = true;
            }
        } catch (e) {
            this.noResults = true;
            console.log(2);
        }
    }

}
