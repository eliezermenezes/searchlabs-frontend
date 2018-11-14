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
        this.urlBase = `${environment.URL_SEARCHLABS}laboratories`;
    }

    public async list() {
        return await this.http.get<Laboratory[]>(this.urlBase).toPromise();
    }

    public async getOnlyLaboratories() {
        return await this.http.get<Laboratory[]>(`${this.urlBase}/list`).toPromise();
    }

    public async create(laboratory: Laboratory) {
        return await this.http.post<Laboratory>(`${this.urlBase}/add`, laboratory).toPromise();
    }

    public async update(id: number, laboratory: Laboratory) {
        return await this.http.patch<Laboratory>(`${this.urlBase}/${id}`, laboratory).toPromise();
    }

    public async delete(id: number) {
        return await this.http.delete<Laboratory>(`${this.urlBase}/${id}/delete`).toPromise();
    }

    public async getById(id: number) {
        return await this.http.get<Laboratory>(`${this.urlBase}/${id}`).toPromise();
    }
}
