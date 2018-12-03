import { Component, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider, SocialUser} from 'angularx-social-login';
import { Router } from '@angular/router';
import { MessageRequest} from '../../shared/components/confirm/message-request';
import { AuthenticateService } from '../authenticate.service';
import { EventsService } from '../../shared/services/event.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public user: SocialUser;
    public msg: MessageRequest = new MessageRequest();
    public errorLogin: string;
    public userNotFound: boolean;

    constructor(
        private authService: AuthService,
        private authenticate: AuthenticateService,
        private router: Router,
        private events: EventsService
    ) {
        this.events.on('logout', (value: boolean) => {
            this.signOut();
        });
    }

    async ngOnInit() {
        await this.authService.authState.subscribe((user) => {
            this.user = user;
            if (user) {
                this.doLogin(this.user);
            }
        });
    }

    public async doLogin(user: SocialUser) {
        try {
            const response = await this.authenticate.doLogin(user);
            if (response) {
                this.userNotFound = false;
                this.authenticate.addLogin(response);
            }
        } catch (e) {
            this.userNotFound = true;
            this.errorLogin = this.msg.login_error;
            console.log(e);
        }
    }

    signInWithGoogle(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    async signOut() {
        await this.authService.signOut();
        this.authenticate.addLogout();
    }
}
