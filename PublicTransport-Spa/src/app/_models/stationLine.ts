import { Line } from './line';
import { Station } from './station';

export interface StationLine {
    lineId: string;
    stationId: string;
    line: Line;
    station: Station;
}
