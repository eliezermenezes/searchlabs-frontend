import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Reservation } from '../shared/models/reservation.model';

@Injectable({
    providedIn: 'root'
})
export class ReservationService {

    public urlBase: string;

    constructor(private http: HttpClient) {
        this.urlBase = `${environment.URL_SEARCHLABS}reservations`;
    }

    public async list() {
        return await this.http.get<Reservation[]>(this.urlBase).toPromise();
    }
}
