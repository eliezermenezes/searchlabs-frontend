import { Component, OnInit } from '@angular/core';
import { UtilsService } from './../shared/services/utils.service';

@Component({
  selector: 'app-solicitation',
  templateUrl: './solicitation.component.html',
  styleUrls: ['./solicitation.component.scss']
})
export class SolicitationComponent implements OnInit {

  constructor(private utilsService: UtilsService) { }

  ngOnInit() {
    this.utilsService.eventAlterHeader('Solicitações de Reservas');
  }

}
