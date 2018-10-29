import { Resource } from "./resource.model";

export class Laboratory {
    public id: number;
    public name: string;
    public localization?: string;
    public status: string;
    public situation: string;
    public observation?: string;
    public resources?: Resource[];
}