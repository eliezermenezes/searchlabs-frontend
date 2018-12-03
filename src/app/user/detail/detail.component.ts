import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { MessageRequest } from '../../shared/components/confirm/message-request';
import { ConfigDialog } from '../../shared/components/confirm/config-dialog';
import { DetailBaseComponent } from '../../shared/components/detail-base/detail-base.component';
import { UserService } from '../user.service';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent extends DetailBaseComponent implements OnInit {

    public config: ConfigDialog = new ConfigDialog();
    public msg: MessageRequest = new MessageRequest();

    constructor(
        protected utils: UtilsService,
        private userService: UserService,
        protected routerActive: ActivatedRoute
    ) {
        super(routerActive, utils);
    }

    public async ngOnInit() {
        this.loading = true;
        await this.loadDetail();
    }

    protected async get(id: number) {
        try {
            let user = await this.userService.getUser(id);
            if (user) {
                this.utils.alterHeader('Perfil de ' + (user.name + ' ' + user.family_name), true);
                this.user = user;
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
}
