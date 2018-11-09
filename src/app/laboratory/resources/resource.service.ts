import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resource } from 'src/app/shared/models/resource.model';

@Injectable({
    providedIn: 'root'
})
export class ResourceService {

    public urlBase: string;

    constructor(private http: HttpClient) {
        this.urlBase = `${environment.URL_SEARCHLABS}resources`;
    }

    public async get(laboratory: number) {
        return await this.http.get<Resource[]>(`${this.urlBase}/by/laboratory/${laboratory}`).toPromise();
    }

    public async getById(id: number) {
        return await this.http.get<Resource>(`${this.urlBase}/${id}`).toPromise();
    }

    public async create(resource: Resource) {
        return await this.http.post<Resource>(`${this.urlBase}/add`, resource).toPromise();
    }

    public async update(id: number, resource: Resource) {
        return await this.http.patch<Resource>(`${this.urlBase}/${id}`, resource).toPromise();
    }

    public async delete(id: number) {
        return await this.http.delete<Resource>(`${this.urlBase}/${id}/delete`).toPromise();
    }
}
