import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Solicitation } from '../shared/models/solicitation.module';

@Injectable({
    providedIn: 'root'
})
export class SolicitationService {

    public url_base: string;

    constructor(private http: HttpClient) {
        this.url_base = `${environment.URL_SEARCHLABS}solicitations`;
    }

    public async list() {
        return await this.http.get<Solicitation[]>(this.url_base).toPromise();
    }
}
