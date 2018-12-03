import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../shared/services/utils.service';
import { ReservationService } from './reservation.service';
import { Reservation } from '../shared/models/reservation.model';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-reservation',
    templateUrl: './reservation.component.html',
    styleUrls: ['./reservation.component.scss'],
    providers: [ReservationService]
})
export class ReservationComponent implements OnInit {

    public reservation: Reservation;
    public reservations: Reservation[];
    public noResults: boolean;

    constructor(
        private reservationService: ReservationService,
        private toastr: ToastrService,
        private utilsService: UtilsService
    ) {
    }

    ngOnInit() {
        this.utilsService.alterHeader('Reservas de laboratórios');
        this.reservation = new Reservation();
        this.reservations = new Array<Reservation>();

        this.listLaboratories();
    }

    public async listLaboratories() {
        try {
            const reservations = await this.reservationService.list();
            if (reservations.length > 0) {
                this.reservations = reservations;
            } else {
                this.noResults = true;
            }
        } catch (error) {
            this.noResults = true;
            console.log(error);
        }
    }

}
