import { Component, OnInit } from '@angular/core';
import { DetailBaseComponent } from 'src/app/shared/components/detail-base/detail-base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitationService } from '../solicitation.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { ConfigDialog } from '../../shared/components/confirm/config-dialog';
import { MessageRequest } from '../../shared/components/confirm/message-request';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent extends DetailBaseComponent implements OnInit {

    public days_week: Array<string>;
    public config: ConfigDialog = new ConfigDialog();
    public msg: MessageRequest = new MessageRequest();

    constructor(
        protected routerActive: ActivatedRoute,
        private solicitationService: SolicitationService,
        protected utils: UtilsService,
        private router: Router,
        private dialogs: NgxCoolDialogsService
    ) {
        super(routerActive, utils);
    }

    async ngOnInit() {
        this.loading = true;
        await this.loadDetail();
    }

    protected async get(id: number) {
        try {
            const solicitation = await this.solicitationService.getById(id);
            if (solicitation) {
                this.solicitation = solicitation;
                this.solicitation.repeate === 'yes' ? await this.loadDaysWeek() : this.loading = false;
                this.utils.alterHeader('Detalhes - Solicitação ' + (this.solicitation.id <= 10 ? '00' : '0') + this.solicitation.id, true);
            } else {
                this.noResults = true;
            }
        } catch (e) {
            this.noResults = true;
            console.log(e);
        }
    }

    public async loadDaysWeek() {
        try {
            let daysWeek = await this.solicitationService.getDaysWeek();
            let days = this.solicitation.days_week.split(',');
            this.days_week = days.map(value => {

                let day = null;
                daysWeek.forEach(element => {
                    if (element.value === value) {
                        day = element;
                    }
                });
                return day;
            });
        } catch (e) {
            console.log(e);
        } finally {
            this.loading = false;
        }
    }

    public confirmAccept() {
        this.dialogs.prompt(`${this.config.confirm_accept} ${this.config.justify_answer}`, this.config.accept).subscribe((response: any) => {
            if (response.result) {
                this.accept(response.value);
            }
        });
    }

    public confirmRefuse() {
        this.dialogs.prompt(`${this.config.confirm_refuse} ${this.config.justify_answer}`, this.config.refuse).subscribe((response: any) => {
            if (response.result) {
                this.refuse(response.value);
            }
        });
    }

    public confirmCancel() {
        this.dialogs.prompt(`${this.config.confirm_cancel} ${this.config.justify_cancel}`, this.config.cancel).subscribe((response: any) => {
            if (response.result) {
                this.cancel(response.value);
            }
        });
    }

    public confirmDelete() {
        this.dialogs.confirm(this.config.confirm_delete_item).subscribe(response => {
            if (response) {
                this.delete();
            }
        });
    }

    private async accept(description?: string) {
        try {
            const accepted = await this.solicitationService.accept(this.solicitation.id,
                { answer_description: description }
            );
            if (accepted) {
                this.ngOnInit();
                this.utils.rollbackSuccess(this.msg.accept_success);
            } else
                this.utils.rollbackError(this.msg.accept_error);
        } catch (e) {
            this.utils.rollbackError(this.msg.error_request);
            console.log(e);
        }
    }

    private async refuse(description?: string) {
        try {
            const refused = await this.solicitationService.refuse(this.solicitation.id,
                { answer_description: description }
            );
            if (refused) {
                this.ngOnInit();
                this.utils.rollbackSuccess(this.msg.refuse_success);
            } else
                this.utils.rollbackError(this.msg.refuse_error);
        } catch (e) {
            this.utils.rollbackError(this.msg.error_request);
            console.log(e);
        }
    }

    private async cancel(description?: string) {
        try {
            const canceled = await this.solicitationService.cancel(this.solicitation.id,
                { answer_description: description }
            );
            if (canceled) {
                this.ngOnInit();
                this.utils.rollbackSuccess(this.msg.cancel_success);
            } else
                this.utils.rollbackError(this.msg.cancel_error);
        } catch (e) {
            this.utils.rollbackError(this.msg.error_request);
            console.log(e);
        }
    }

    private async delete() {
        try {
            const deleted = await this.solicitationService.delete(this.solicitation.id);
            if (deleted) {
                this.utils.rollbackSuccess(this.msg.deleted_item);
                this.router.navigate(['solicitations']);
            } else {
                this.utils.rollbackError(this.msg.delete_error);
            }
        } catch (e) {
            this.utils.rollbackError(this.msg.error_request);
            console.log(e);
        }
    }

    public goEdit() {
        this.router.navigate(['/solicitations/' + this.solicitation.id + '/edit']);
    }
}
