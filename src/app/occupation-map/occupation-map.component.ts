import { Component, OnInit } from '@angular/core';
import { UtilsService } from './../shared/services/utils.service';

@Component({
  selector: 'app-occupation-map',
  templateUrl: './occupation-map.component.html',
  styleUrls: ['./occupation-map.component.scss']
})
export class OccupationMapComponent implements OnInit {

  constructor(private utilsService: UtilsService) { }

  ngOnInit() {
    this.utilsService.eventAlterHeader('Mapa de Ocupação dos Laboratórios');
  }

}
