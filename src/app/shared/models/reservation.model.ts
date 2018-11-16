import { Solicitation } from 'src/app/shared/models/solicitation.module';
export class Reservation {
    public id: number;
    public solicitation: Solicitation;
    public situation: string;
    public observation?: string;
    public status: string;
}