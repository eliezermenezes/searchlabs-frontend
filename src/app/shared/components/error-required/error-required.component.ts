import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'error-required',
    templateUrl: './error-required.component.html',
    styleUrls: ['./error-required.component.scss']
})
export class ErrorRequiredComponent implements OnInit {

    @Input() showError: boolean;
    @Input() messageError: string;    

    constructor() { }

    ngOnInit() {
    }

}
