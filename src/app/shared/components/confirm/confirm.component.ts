import { Component, OnInit } from '@angular/core';
import { Laboratory } from '../../models/laboratory.model';
import { BsModalRef } from 'ngx-bootstrap';
import { EventsService } from '../../services/event.service';
import { User } from '../../models/user.model';

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

    public title: string;
    public model: Laboratory | User;
    public event: string;

    constructor(
        private bsModalRef: BsModalRef,
        private events: EventsService
    ) { }

    ngOnInit() {
    }

    public confirm() {
        this.events.broadcast(this.event, this.model.id);
        this.bsModalRef.hide();
    }

}
