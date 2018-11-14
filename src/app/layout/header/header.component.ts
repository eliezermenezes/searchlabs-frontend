import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/shared/services/event.service';
import { Events } from 'src/app/shared/components/events/events';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ConfirmLogoutComponent } from 'src/app/shared/components/confirm-logout/confirm-logout.component';

@Component({
    selector: 'layout-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public logo: string;
    public titleHeader: string;
    public typesEvent: Events = new Events();

    public bsModalRef: BsModalRef;

    constructor(
        private events: EventsService,
        private modalService: BsModalService,
    ) {
        this.events.on(this.typesEvent.ALTER_TITLE_HEADER, (newTitle) => {
            this.titleHeader = newTitle;
        });
    }

    ngOnInit() {
        this.titleHeader = 'Dashboard';
        this.logo = '../../assets/img/searchlabs-logo.png';
    }

    public doLogin() {
        const initialState = {
            event: 'LOGOUT'
        };

        this.bsModalRef = this.modalService.show(ConfirmLogoutComponent, { initialState });
    }
}
