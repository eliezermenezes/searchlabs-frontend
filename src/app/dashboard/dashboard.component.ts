import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../shared/services/utils.service';
import { EventsService } from '../shared/services/event.service';
import { User } from '../shared/models/user.model';
import { AuthenticateService } from '../auth/authenticate.service';
import { Solicitation } from '../shared/models/solicitation.model';
import { SolicitationService } from '../solicitation/solicitation.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    public user: User;
    public logo: string;
    public solicitations: Solicitation[];
    public loading: boolean;
    public noResults: boolean;
    public hasPermissionAdmin: boolean;

    constructor(
        private utils: UtilsService,
        private events: EventsService,
        private authService: AuthenticateService,
        private solService: SolicitationService,
        private router: Router
    ) {}

    ngOnInit() {
        this.loading = true;
        this.events.broadcast('showOptionsMenu', true);
        this.events.broadcast('checkRoleUser');
        this.utils.alterHeader('Dashboard');
        this.logo = '../../assets/img/logo.png';
        this.user = this.authService.getUserAuth();
        this.hasPermissionAdmin = this.user.role === 'administrator';

        this.solicitations = new Array<Solicitation>();
        this.getSituations();
    }

    async getSituations() {
        try {
            const solicitations = await this.solService.list('opened');
            if (solicitations.length > 0) {
                this.solicitations = solicitations;
            } else {
                this.noResults = true;
            }
        } catch (e) {
            this.noResults = true;
            console.log(e);
        } finally {
            this.loading = false;
        }
    }

    public detailSolicitation(solicitation: Solicitation) {
        this.router.navigate(['/solicitations/' + solicitation.id + '/detail']);
    }
}
