import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../shared/services/utils.service';

@Component({
    selector: 'app-reservation',
    templateUrl: './reservation.component.html',
    styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

    constructor(private utilsService: UtilsService) { }

    ngOnInit() {
        this.utilsService.eventAlterHeader('Reservas de laboratórios');
    }

}
