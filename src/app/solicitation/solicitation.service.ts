import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Solicitation } from '../shared/models/solicitation.module';
import { Schedule } from '../shared/interface/schedule';
import { DaysWeek } from '../shared/interface/days_week';

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

    public async create(solicitation: Solicitation) {
        return await this.http.post<Solicitation>(`${this.url_base}/register`, solicitation).toPromise();
    }

    public async update(id: number, solicitation: Solicitation) {
        return await this.http.patch<Solicitation>(`${this.url_base}/${id}`, solicitation).toPromise();
    }

    public async delete(id: number) {
        return await this.http.delete<Solicitation>(`${this.url_base}/${id}/delete`).toPromise();
    }

    public async getById(id: number) {
        return await this.http.get<Solicitation>(`${this.url_base}/${id}`).toPromise();
    }

    public async getDaysWeek() {
        return await this.http.get<DaysWeek[]>('assets/days_week.json').toPromise();
    }

    public async getSchedules() {
        return await this.http.get<Schedule[]>('assets/schedules.json').toPromise();
    }
}