export class Directions {
    origin: any;
    destination: any;
    waypoints: any[];
    show: boolean;

    constructor() {
        this.waypoints = new Array<any>();
        this.show = true;
    }
}
