import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { MessageRequest } from '../../shared/components/confirm/message-request';
import { ConfigDialog } from '../../shared/components/confirm/config-dialog';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { UserService } from '../user.service';
import { AuthenticateService } from '../../auth/authenticate.service';
import { User } from '../../shared/models/user.model';
import { EventsService } from '../../shared/services/event.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    public loading: boolean;
    public user: User;
    public noResults: boolean;

    public config: ConfigDialog = new ConfigDialog();
    public msg: MessageRequest = new MessageRequest();

    constructor(
        private utils: UtilsService,
        private userService: UserService,
        private router: Router,
        private routerActive: ActivatedRoute,
        private dialogs: NgxCoolDialogsService,
        private auth: AuthenticateService,
        private events: EventsService
    ) {}

    public ngOnInit() {
        this.utils.alterHeader('Meu Perfil', false);
        this.loadProfile();
    }

    public async loadProfile() {
        this.loading = true;
        const user = this.auth.getUserAuth();
        await this.get(user.id);
    }

    private async get(id: number) {
        try {
            let user = await this.userService.getUser(id);
            if (user) {
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

    public async delete() {
        try {
            const userDeleted = await this.userService.delete(this.user.id);
            if (!userDeleted) {
                this.utils.rollbackError(this.msg.delete_error);
            } else {
                this.events.broadcast('logout', true);
            }
        } catch (error) {
            this.utils.rollbackError(this.msg.error_request);
            console.log(error);
        }
    }

    public goEdit() {
        this.router.navigate(['users/profile/edit/' + this.user.id]);
    }

    public confirmDelete() {
        this.dialogs.confirm(this.config.msg_des_account).subscribe(response => {
            if (response) {
                this.delete();
            }
        });
    }
}
