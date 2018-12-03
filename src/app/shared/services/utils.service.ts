import { Injectable } from '@angular/core';

import { EventsService } from './event.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticateService } from '../../auth/authenticate.service';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    constructor(
        private events: EventsService,
        private toastr: ToastrService,
        private auth: AuthenticateService
    ) { }

    public rollbackSuccess(message: string) {
        this.toastr.success(message, 'Sucesso');
    }

    public rollbackError(message: string) {
        this.toastr.error(message, 'Erro');
    }

    public alterHeader(title: string, back?: boolean) {
        this.events.broadcast('_altHeader', title, back ? true : false);
    }

    public hasPermissionOfAdmin() {
        return this.auth.getUserAuth().role === 'administrator'
    }
}
