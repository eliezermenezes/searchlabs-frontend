import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SolicitationService } from '../solicitation.service';
import { ToastrService } from 'ngx-toastr';
import { EventsService } from 'src/app/shared/services/event.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { Events } from 'src/app/shared/components/events/events';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

    constructor(
        private formBuilder: FormBuilder,
        private solicitationService: SolicitationService,
        private toastr: ToastrService,
        private events: EventsService,
        private utils: UtilsService
    ) { }

    ngOnInit() {
        this.utils.eventAlterHeader('Nova Solicitação de Reserva');
    }

}
