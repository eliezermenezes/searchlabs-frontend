import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'invalid-date',
  templateUrl: './invalid-date.component.html',
  styleUrls: ['./invalid-date.component.scss']
})
export class InvalidDateComponent implements OnInit {

  @Input() showError: boolean;
  @Input() messageError: string;

  constructor() { }

  ngOnInit() {
  }

}
