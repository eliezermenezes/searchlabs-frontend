import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import 'rxjs/add/observable/from';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  public listeners;
  public eventsSubject;
  public events;

  constructor() {
    this.listeners = {};
    this.eventsSubject = new Subject();

    this.events = Observable.from(this.eventsSubject);

    this.events.subscribe(
      ({ name, args }) => {
        if (this.listeners[name]) {
          for (const listener of this.listeners[name]) {
            listener(...args);
          }
        }
      });
  }

  on(name, listener) {
    if (!this.listeners[name]) {
      this.listeners[name] = [];
    }

    this.listeners[name].push(listener);
  }

  broadcast(name, ...args) {
    this.eventsSubject.next({
      name,
      args
    });
  }
}