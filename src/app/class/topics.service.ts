import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Topic } from '../shared/models/topic.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TopicsService {

    public urlBase: string;

    constructor(private http: HttpClient) {
        this.urlBase = `${environment.URL_SEARCHLABS}topics`;
    }

    public async get(classe: number) {
        return await this.http.get<Topic[]>(`${this.urlBase}/by/class/${classe}`).toPromise();
    }

    public async getById(id: number) {
        return await this.http.get<Topic>(`${this.urlBase}/${id}`).toPromise();
    }

    public async create(classe: Topic) {
        return await this.http.post<Topic>(`${this.urlBase}/add`, classe).toPromise();
    }

    public async update(id: number, classe: Topic) {
        return await this.http.patch<Topic>(`${this.urlBase}/${id}`, classe).toPromise();
    }

    public async delete(id: number) {
        return await this.http.delete<Topic>(`${this.urlBase}/${id}/delete`).toPromise();
    }
}
