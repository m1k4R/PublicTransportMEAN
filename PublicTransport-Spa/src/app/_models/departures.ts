export class Departures {
    name: string;
    /* departuresHour: string[]; */
    departuresHour: string[];
    description: string;

    constructor() { 
        this.departuresHour = new Array(18);
        this.description = "";
    }

}
