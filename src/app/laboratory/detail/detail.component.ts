import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LaboratoryService } from '../laboratory.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { TabsetComponent } from 'ngx-bootstrap';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { MessageRequest } from '../../shared/components/confirm/message-request';
import { ConfigDialog } from '../../shared/components/confirm/config-dialog';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { DetailBaseComponent } from '../../shared/components/detail-base/detail-base.component';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent extends DetailBaseComponent implements OnInit {
    @ViewChild('staticTabs') staticTabs: TabsetComponent;

    public config: ConfigDialog = new ConfigDialog();
    public msg: MessageRequest = new MessageRequest();

    constructor(
        protected utils: UtilsService,
        private laboratoryService: LaboratoryService,
        private router: Router,
        protected routerActive: ActivatedRoute,
        public ngxSmartModalService: NgxSmartModalService,
        private dialogs: NgxCoolDialogsService
    ) {
        super(routerActive, utils);
    }

    public async ngOnInit() {
        this.loading = true;
        await this.loadDetail();
    }

    protected async get(id: number) {
        try {
            let laboratory = await this.laboratoryService.getById(id);
            if (laboratory) {
                this.utils.alterHeader('Detalhes - ' + laboratory.name, true);
                this.laboratory = laboratory;
            } else {
                this.noResults = true;
            }
        } catch (e) {
            this.noResults = true;
            console.log(e);
        } finally {
            this.loading = false;
        }
    }

    public async delete() {
        try {
            const labDeleted = await this.laboratoryService.delete(this.laboratory.id);
            if (!labDeleted) {
                this.utils.rollbackError(this.msg.delete_error);
            } else {
                this.utils.rollbackSuccess(this.msg.deleted_item);
                this.router.navigate(['laboratories']);
            }
        } catch (error) {
            this.utils.rollbackError(this.msg.error_request);
            console.log(error);
        }
    }

    public goEdit() {
        this.router.navigate(['laboratories/' + this.laboratory.id + '/edit']);
    }

    public confirmDelete() {
        this.dialogs.confirm(this.config.confirm_delete_item).subscribe(response => {
            if (response) {
                this.delete();
            }
        });
    }

    public editSituation() {
        this.ngxSmartModalService.getModal('alterSituation').open();
    }

    public refreshPage(event: any) {
        this.get(event);
    }
}
