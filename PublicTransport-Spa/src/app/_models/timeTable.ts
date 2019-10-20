import { Line } from './line';

export interface TimeTable {
    _id: string;
    type: string;
    day: string;
    line: Line;
    departures: string;
    //lineId: string;
}
