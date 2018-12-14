import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { UtilsService } from '../shared/services/utils.service';
import { User } from '../shared/models/user.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    providers: [UserService]
})
export class UserComponent implements OnInit {

    public user: User;
    public users: User[];
    public noResults: boolean;

    constructor(
        private userService: UserService,
        private utilsService: UtilsService,
        private router: Router
    ) {}

    ngOnInit() {
        this.utilsService.alterHeader('Usuários');
        this.user = new User();
        this.users = new Array<User>();

        this.listUsers();
    }

    public async listUsers() {
        try {
            const users = await this.userService.list();
            if (users.length > 0) {
                this.users = users;
            } else {
                this.noResults = true;
            }
        } catch (error) {
            this.noResults = true;
            console.log(error);
        }
    }

    public goDetail(user: User) {
        this.router.navigate(['/users/' + user.id + '/detail']);
    }
}

