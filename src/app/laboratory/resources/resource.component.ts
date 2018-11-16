import { Component, OnInit, OnDestroy } from '@angular/core';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { LaboratoryService } from '../laboratory.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Laboratory } from 'src/app/shared/models/laboratory.model';
import { Subscription } from 'rxjs';
import { Resource } from 'src/app/shared/models/resource.model';
import { ResourceService } from './resource.service';
import { EventsService } from 'src/app/shared/services/event.service';
import { Events } from 'src/app/shared/components/events/events';

@Component({
    selector: 'app-resources',
    templateUrl: './resource.component.html',
    styleUrls: ['./resource.component.scss'],
    providers: [ResourceService]
})
export class ResourceComponent implements OnInit, OnDestroy {

    public laboratory: Laboratory;
    public resources: Resource[];
    public subscribe: Subscription;
    public noResults: boolean;

    constructor(
        private laboratoryService: LaboratoryService,
        private resourceService: ResourceService,
        private toastr: ToastrService,
        private router: Router,
        private routerActive: ActivatedRoute,
        private events: EventsService
    ) { }

    async ngOnInit() {
        this.resources = new Array<Resource>();

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
                this.laboratory = laboratory;
                this.getResources();
            }
        } catch (e) {
            console.log(e);
        }
    }

    public async getResources() {
        try {
            let resources = await this.resourceService.get(this.laboratory.id);
            if (resources.length > 0) {
                this.resources = resources;
            } else {
                this.noResults = true;
            }
        } catch (e) {
            this.noResults = true;
            console.log(e);
        }
    }

    public async refleshResources(feedback: any) {
        if (feedback === Events.prototype.resourceREFRESH) {
            await this.getResources();
            if (this.resources.length > 0) {
                this.noResults = false;
            }
        }
    }

    public async delete(resource: Resource) {
        try {
            const resourceDeleted = await this.resourceService.delete(resource.id);
            if (resourceDeleted) {
                this.toastr.success("Recurso deletado", "Sucesso");
                this.getResources();
            } else {
                this.toastr.error("Recurso não deletado", "Erro");
            }

        } catch (e) {
            this.toastr.error("Erro ao processar a requisição", "Erro");
            console.log(e);
        }
    }

    public edit(resource: Resource) {
        this.events.broadcast(Events.prototype.resourceEDIT, resource);
    }

    ngOnDestroy() {
        this.subscribe.unsubscribe();
    }
}
