import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from '../shared/services/utils.service';

import { User } from '../shared/models/user.model';

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
        private toastr: ToastrService,
        private utilsService: UtilsService
    ) {
    }

    ngOnInit() {
        this.utilsService.eventAlterHeader('Usuários');
        this.user = new User();
        this.users = new Array<User>();

        this.listUsers();
    }

    public addUser() {
        console.log('aadd');
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
}

