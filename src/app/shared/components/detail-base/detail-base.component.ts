import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Solicitation } from '../../models/solicitation.model';
import { ActivatedRoute } from '@angular/router';
import { Laboratory } from '../../models/laboratory.model';
import { User } from '../../models/user.model';
import { Class } from '../../models/class.model';
import { UtilsService } from '../../services/utils.service';

@Component({
    selector: 'app-detail-base',
    template: '<div></div>',
})
export abstract class DetailBaseComponent implements OnInit, OnDestroy {

    public subscribe: Subscription;

    public solicitation: Solicitation;
    public laboratory: Laboratory;
    public user: User;
    public class: Class;

    public noResults: boolean;
    public loading: boolean;

    public hasPermissionOfAdm: boolean;

    constructor(
        protected routerActive: ActivatedRoute,
        protected utils: UtilsService
    ) {}

    ngOnInit() {}

    protected async loadDetail() {
        this.subscribe = await this.routerActive.params.subscribe((params: any) => {
            if (params['id']) {
                this.get(params['id']);
            }
        });

        this.hasPermissionOfAdm = this.utils.hasPermissionOfAdmin();
    }

    protected abstract get(id: number);

    ngOnDestroy() {
        this.subscribe.unsubscribe();
    }
}
