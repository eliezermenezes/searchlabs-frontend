import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable}  from 'rxjs';
import { AuthenticateService } from '../../auth/authenticate.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate{

    constructor(
        private authService: AuthenticateService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.authService.userLogged()) {
            return true;
        }

        this.router.navigate(['/auth']);
        return false;
    }
}
