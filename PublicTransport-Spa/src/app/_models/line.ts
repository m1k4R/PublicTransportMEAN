import { Bus } from './bus';
import { StationLine } from './stationLine';
import { Station } from './station';

export interface Line {
    _id: string;
    lineNumber: number;
    name: string;
    stations: Station[];
    buses: Bus[];
}
