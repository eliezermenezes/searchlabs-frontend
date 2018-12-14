import {Component, Input, OnInit} from '@angular/core';
import { AuthenticateService } from '../../auth/authenticate.service';

@Component({
    selector: 'menu-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    @Input() checkRole: boolean;
    public isAdmin: boolean;

    constructor(
        private authService: AuthenticateService
    ) {}

    ngOnInit() {
        const user = this.authService.getUserAuth();
        this.isAdmin = user.role === 'administrator';
    }
}
