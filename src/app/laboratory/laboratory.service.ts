import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Laboratory } from '../shared/models/laboratory.model';

@Injectable({
    providedIn: 'root'
})
export class LaboratoryService {

    public urlBase: string;

    constructor(private http: HttpClient) {
        this.urlBase = `${environment.URL_SEARCHLABS}laboratory`;
    }

    public async list() {
        return await this.http.get<Laboratory[]>(this.urlBase).toPromise();
    }
}
