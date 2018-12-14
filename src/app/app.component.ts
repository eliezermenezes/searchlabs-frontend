import { Component, OnInit } from '@angular/core';
import { EventsService } from './shared/services/event.service';
import { AuthenticateService } from './auth/authenticate.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    public title: string;
    public showOptionsMenu: boolean;

    constructor(
        private events: EventsService,
        private authService: AuthenticateService,
        private router: Router
    ) {
        this.events.on('showOptionsMenu', (value: boolean) => {
            this.showOptionsMenu = value;
        });
    }

    public ngOnInit() {
        this.title = 'frontend';

        if (this.authService.userLogged()) {
            this.router.navigate(['/dashboard']);
        }
    }

}
