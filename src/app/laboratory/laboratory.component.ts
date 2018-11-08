import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../shared/services/utils.service';
import { LaboratoryService } from './laboratory.service';
import { Laboratory } from '../shared/models/laboratory.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ConfirmComponent } from '../shared/components/confirm/confirm.component';
import { EventsService } from '../shared/services/event.service';

@Component({
    selector: 'app-laboratory',
    templateUrl: './laboratory.component.html',
    styleUrls: ['./laboratory.component.scss'],
    providers: [LaboratoryService]
})
export class LaboratoryComponent implements OnInit {

    public laboratories: Laboratory[];
    public noResults: boolean;

    public bsModalRef: BsModalRef;

    constructor(
        private utils: UtilsService,
        private laboratoryService: LaboratoryService,
        private router: Router,
        private toastr: ToastrService,
        private modalService: BsModalService,
        private events: EventsService
    ) {
        this.events.on('DELETE_LABORATORY', (id: number) => {
            this.deleteLaboratory(id);
        });
    }

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

    public async deleteLaboratory(id: number) {
        try {
            const labDeleted = await this.laboratoryService.delete(id);
            if (!labDeleted) {
                this.toastr.error("Não foi possível deletar o laboratório", "Erro");
            } else {
                this.toastr.success("Laboratório deletado", "Sucesso");
                this.listLaboratories();
            }
        } catch (error) {
            this.toastr.error("Erro ao processar a requisição", "Erro");
            console.log(error);
        }
    }

    public confirmDelete(laboratory) {
        const initialState = {
            title: 'laboratório',
            event: 'DELETE_LABORATORY',
            model: laboratory
        };

        this.bsModalRef = this.modalService.show(ConfirmComponent, { initialState });
    }

    public goEdit(laboratory: Laboratory) {
        this.router.navigate(['laboratories/' + laboratory.id + '/editar']);
    }

    public goResources(laboratory: Laboratory) {
        this.router.navigate(['laboratories/' + laboratory.id + '/resources']);
    }
}
