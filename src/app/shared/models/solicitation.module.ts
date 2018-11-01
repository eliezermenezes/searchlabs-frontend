
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
    public laboratory_id: number;
    public class_id: number;
}