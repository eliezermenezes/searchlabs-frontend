import { Injectable } from '@angular/core';

import { EventsService } from './event.service';
import { Events } from '../components/events/events';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    public typeEvent: Events = new Events();

    constructor(private events: EventsService) {}

    public eventAlterHeader(title: string) {
        this.events.broadcast(this.typeEvent.ALTER_TITLE_HEADER, title);
    }
}
