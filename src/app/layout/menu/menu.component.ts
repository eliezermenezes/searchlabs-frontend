import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'layout-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

    public logo: string;

    constructor() { }

    ngOnInit() {
        this.logo = '../assets/img/searchlabs-logo.png';
    }

}
