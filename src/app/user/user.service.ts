import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../shared/models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    public pathAPI: string;

    constructor(private http: HttpClient) {
        this.pathAPI = `${environment.URL_SEARCHLABS}users`;
    }

    public async list() {
        return await this.http.get<User[]>(this.pathAPI).toPromise();
    }

    public async getUser(id: number) {
        return await this.http.get<User>(`${this.pathAPI}/${id}`).toPromise();
    }

    public async create(user: User) {
        return await this.http.post<User>(`${this.pathAPI}/add`, user).toPromise();
    }

    public async update(id: number, user: User) {
        return await this.http.patch<User>(`${this.pathAPI}/${id}`, user).toPromise();
    }

    public async delete(id: number) {
        return await this.http.delete<User>(`${this.pathAPI}/${id}`).toPromise();
    }

    public roles() {
        return [{
            value: 'administrator',
            desc: 'Administrador'
        }, {
            value: 'teacher',
            desc: 'Professor'
        }];
    }

    public genders() {
        return [{
            value: 'male',
            desc: 'Masculino'
        }, {
            value: 'female',
            desc: 'Feminino'
        }];
    }
}
