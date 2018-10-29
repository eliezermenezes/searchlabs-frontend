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
        this.pathAPI = `${environment.URL_SEARCHLABS}user`;
    }

    public async list() {
        return await this.http.get<User[]>(this.pathAPI).toPromise();
    }
}
