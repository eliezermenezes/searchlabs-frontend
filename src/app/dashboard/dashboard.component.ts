import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/shared/services/event.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor(private events: EventsService) { }

    ngOnInit() {
        this.emitEventAlterTitle();
    }

    private emitEventAlterTitle() {
        this.events.broadcast('ALTER_TITLE_HEADER', 'Dashboard');
    }

}
