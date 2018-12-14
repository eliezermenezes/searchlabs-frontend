import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/shared/services/event.service';
import { Location } from '@angular/common';
import { ConfigDialog } from '../../shared/components/confirm/config-dialog';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { UtilsService } from '../../shared/services/utils.service';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../auth/authenticate.service';
import { User } from '../../shared/models/user.model';

@Component({
    selector: 'layout-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public showBack: boolean;
    public logo: string;
    public title: string;
    public userLogged: User;

    public config: ConfigDialog = new ConfigDialog();

    constructor(
        private events: EventsService,
        private _location: Location,
        private utils: UtilsService,
        private dialogs: NgxCoolDialogsService,
        private router: Router,
        private auth: AuthenticateService
    ) {
        this.events.on('_altHeader', (title: string, back: boolean) => {
            this.title = title;
            this.showBack = back;
        });
    }

    ngOnInit() {
        this.showBack = false;
        this.title = 'Dashboard';
        this.logo = '../../assets/img/logo.png';
        this.userLogged = this.auth.getUserAuth();
    }

    public doLogout() {
        this.dialogs.confirm(this.config.confirm_logout).subscribe(response => {
            if (response) {
                this.events.broadcast('logout', true);
            }
        });
    }

    public goProfile() {
        this.events.broadcast('profile', true);
        this.router.navigate(['/users/profile']);
    }

    public comeBack() {
        this._location.back();
    }
}
