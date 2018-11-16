import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Laboratory } from 'src/app/shared/models/laboratory.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LaboratoryService } from '../laboratory.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { ToastrService } from 'ngx-toastr';
import { EventsService } from 'src/app/shared/services/event.service';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

    public laboratory: Laboratory;
    public subscribe: Subscription;
    public noResults: boolean;

    public bsModalRef: BsModalRef;

    constructor(
        private utils: UtilsService,
        private laboratoryService: LaboratoryService,
        private router: Router,
        private routerActive: ActivatedRoute,
        private modalService: BsModalService,
        private toastr: ToastrService,
        private events: EventsService
    ) {
        this.events.on('DELETE_LABORATORY', (id: number) => {
            this.deleteLaboratory(id);
        });
    }

    public async ngOnInit() {

        this.subscribe = await this.routerActive.params.subscribe((params: any) => {
            let lab_id = params['id'];
            if (lab_id) {
                this.getLaboratory(lab_id);
            } else {
                this.router.navigate(['/laboratories']);
            }
        });
    }

    public async getLaboratory(id: number) {
        try {
            let laboratory = await this.laboratoryService.getById(id);
            if (laboratory) {
                this.utils.eventAlterHeader('Detalhes - ' + laboratory.name);
                this.laboratory = laboratory;
            }
        } catch (e) {
            console.log(e);
        }
    }

    public async deleteLaboratory(id: number) {
        try {
            const labDeleted = await this.laboratoryService.delete(id);
            if (!labDeleted) {
                this.toastr.error("Não foi possível deletar o laboratório", "Erro");
            } else {
                this.toastr.success("Laboratório deletado", "Sucesso");
                this.router.navigate(['laboratories']);
            }
        } catch (error) {
            this.toastr.error("Erro ao processar a requisição", "Erro");
            console.log(error);
        }
    }

    public goEdit() {
        this.router.navigate(['laboratories/' + this.laboratory.id + '/edit']);
    }

    public confirmDelete() {
        const initialState = {
            title: 'laboratório',
            event: 'DELETE_LABORATORY',
            model: this.laboratory
        };

        this.bsModalRef = this.modalService.show(ConfirmComponent, { initialState });
    }

    public ngOnDestroy() {
        this.subscribe.unsubscribe();
    }

}
