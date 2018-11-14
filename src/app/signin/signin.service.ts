import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SigninService {

    public urlAuth: string;

    constructor(private http: HttpClient) {
        this.urlAuth = `${environment.URL_SEARCHLABS}auth/login`;
    }

    public async doLogin(dados: any) {
        return await this.http.post<any>(`${this.urlAuth}`, dados).toPromise();
    }

    public doLogout() {

    }
}
