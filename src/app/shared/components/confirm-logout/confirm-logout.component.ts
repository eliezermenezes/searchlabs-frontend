import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { EventsService } from '../../services/event.service';

@Component({
    selector: 'app-confirm-logout',
    templateUrl: './confirm-logout.component.html',
    styleUrls: ['./confirm-logout.component.scss']
})
export class ConfirmLogoutComponent implements OnInit {

    public event: string;

    constructor(
        private bsModalRef: BsModalRef,
        private events: EventsService
    ) { }

    ngOnInit() {
    }

    public confirm() {
        this.events.broadcast(this.event, true);
        this.bsModalRef.hide();
    }

}