import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/shared/services/event.service';
import { Events } from 'src/app/shared/components/events/events';

@Component({
    selector: 'layout-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public logo: string;
    public titleHeader: string;
    public typesEvent: Events = new Events();

    constructor(private events: EventsService) {
        this.events.on(this.typesEvent.ALTER_TITLE_HEADER, (newTitle) => {
            this.titleHeader = newTitle;
        });
    }

    ngOnInit() {
        this.titleHeader = 'Dashboard';
        this.logo = '../../assets/img/searchlabs-logo.png';
    }
}
