import { Laboratory } from './laboratory.model';
import { Class } from './class.model';

export class Solicitation {
    public id: number;
    public start_date: Date;
    public end_date: Date;
    public start_hour: string;
    public end_hour: string;
    public repeate?: string;
    public days_week?: string;
    public observation?: string;
    public situation: string;
    public answer_date?: Date;
    public answer_description?: string;
    public status: string;
    public laboratory: Laboratory;
    public class: Class;
}