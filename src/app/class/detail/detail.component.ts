import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { TabsetComponent } from 'ngx-bootstrap';
import { MessageRequest } from '../../shared/components/confirm/message-request';
import { ConfigDialog } from '../../shared/components/confirm/config-dialog';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { DetailBaseComponent } from '../../shared/components/detail-base/detail-base.component';
import { ClassService } from '../class.service';

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
        private classService: ClassService,
        private router: Router,
        protected routerActive: ActivatedRoute,
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
            let classe = await this.classService.getById(id);
            if (classe) {
                this.utils.alterHeader('Detalhes - ' + classe.name, true);
                this.class = classe;
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
            const classDeleted = await this.classService.delete(this.class.id);
            if (!classDeleted) {
                this.utils.rollbackError(this.msg.delete_error);
            } else {
                this.utils.rollbackSuccess(this.msg.delete_success);
                this.router.navigate(['classes']);
            }
        } catch (error) {
            this.utils.rollbackError(this.msg.error_request);
            console.log(error);
        }
    }

    public goEdit() {
        this.router.navigate(['classes/' + this.class.id + '/edit']);
    }

    public confirmDelete() {
        this.dialogs.confirm(this.config.msg_confirm).subscribe(response => {
            if (response) {
                this.delete();
            }
        });
    }
}
