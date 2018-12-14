import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CredentialsGoogle } from './interfaces/credentials-google';
import { CredentialsAuth } from './interfaces/credentials-auth';
import { Router } from '@angular/router';
import { EventsService } from '../shared/services/event.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticateService {

    private logged: boolean;
    public urlBase: string;

    constructor(
        private http: HttpClient,
        private router: Router,
        private events: EventsService
    ) {
        this.urlBase = `${environment.URL_SEARCHLABS}auth/`;
    }

    public async doLogin(credentials: CredentialsGoogle) {
        return await this.http.post<CredentialsAuth>(`${this.urlBase}login`, credentials).toPromise();
    }

    public userLogged() {
        const token = sessionStorage.getItem('token');
        const user = sessionStorage.getItem('user');

        return (token && user);
    }

    public getUserAuth() {
        return JSON.parse(sessionStorage.getItem('user'));
    }

    public addLogin(response: CredentialsAuth) {
        this.logged = true;

        sessionStorage.setItem('token', response.token.access);
        sessionStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['/dashboard']);
    }

    public addLogout() {
        this.logged = false;
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');

        this.events.broadcast('showOptionsMenu', false);
        this.router.navigate(['/auth']);
    }
}
