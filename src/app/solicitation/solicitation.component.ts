import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UtilsService } from './../shared/services/utils.service';
import { Solicitation } from '../shared/models/solicitation.model';
import { SolicitationService } from './solicitation.service';

@Component({
    selector: 'app-solicitation',
    templateUrl: './solicitation.component.html',
    styleUrls: ['./solicitation.component.scss'],
    providers: [SolicitationService]
})
export class SolicitationComponent implements OnInit {

    public solicitations: Solicitation[];
    public noResults: boolean;

    constructor(
        private utilsService: UtilsService,
        private solicitationService: SolicitationService,
        private router: Router
        ) { }

    ngOnInit() {
        this.utilsService.alterHeader('Solicitações de Reservas');

        this.solicitations = new Array<Solicitation>();
        this.listSolicitations();
    }

    public async listSolicitations() {
        try {
            const solicitations = await this.solicitationService.list();
            if(solicitations.length > 0) {
                this.solicitations = solicitations;
            } else {
                this.noResults = true;
            }
        } catch (error) {
            this.noResults = true;
            console.log(error);
        }
    }

    public goDetail(solicitation: Solicitation) {
        this.router.navigate(['/solicitations/' + solicitation.id + '/detail']);
    }
}
