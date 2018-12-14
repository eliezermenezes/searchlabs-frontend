import { User } from '../../shared/models/user.model';

export interface CredentialsAuth {
    auth: boolean;
    token: {
        type: string,
        access: string,
        expires: number
    };
    user: User;
}
