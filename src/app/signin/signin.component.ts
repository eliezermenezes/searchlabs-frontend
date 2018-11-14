import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { SigninService } from './signin.service';
import { Router } from '@angular/router';
import { EventsService } from '../shared/services/event.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
    providers: [SigninService]
})
export class SigninComponent implements OnInit {

    user: SocialUser;
    private loggedIn: boolean;

    constructor(
        private authService: AuthService,
        private signinService: SigninService,
        private router: Router,
        private events: EventsService
    ) {
        this.events.on('LOGOUT', (logout: boolean) => {
            console.log('recebi');
            if (logout) {
                this.signOut();
            }
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
            const logged = await this.signinService.doLogin(user);
            if (logged) {
                localStorage.setItem('token', logged.idToken);
                console.log(logged);
                this.router.navigate(['/dashboard']);
            }
        } catch (e) {
            console.log(e);
        }
    }

    signInWithGoogle(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    async signOut() {
        await this.authService.signOut();
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }
}
