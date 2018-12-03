import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Route, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from '../../auth/authenticate.service';
import { UtilsService } from '../../shared/services/utils.service';
import { ROLES } from '../../shared/constants/roles.constants';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    constructor(
        private authService: AuthenticateService,
        private utils: UtilsService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        const authUser = this.authService.getUserAuth();
        if (authUser.role === ROLES.ADMIN) {
            return true;
        }

        this.utils.rollbackError('Você não tem permissão para acessar esse conteúdo!');
        return false;
    }
}
