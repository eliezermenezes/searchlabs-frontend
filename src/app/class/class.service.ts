import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Class } from '../shared/models/class.model';

@Injectable({
    providedIn: 'root'
})
export class ClassService {

    public urlBase: string;

    constructor(private http: HttpClient) {
        this.urlBase = `${environment.URL_SEARCHLABS}classes`;
    }

    public async list() {
        return await this.http.get<Class[]>(this.urlBase).toPromise();
    }

    public async create(classs: Class) {
        return await this.http.post<Class>(`${this.urlBase}/add`, classs).toPromise();
    }

    public async update(id: number, classs: Class) {
        return await this.http.patch<Class>(`${this.urlBase}/${id}`, classs).toPromise();
    }

    public async delete(id: number) {
        return await this.http.delete<Class>(`${this.urlBase}/${id}/delete`).toPromise();
    }

    public async getById(id: number) {
        return await this.http.get<Class>(`${this.urlBase}/${id}`).toPromise();
    }

    public async getByTeacher(teacher: number) {
        return await this.http.get<Class[]>(`${this.urlBase}/by/teacher/${teacher}`).toPromise();
    }

    public async getOnlyClasses(teacher: number) {
        return await this.http.get<Class[]>(`${this.urlBase}/by/teacher/${teacher}/only`).toPromise();
    }
}
