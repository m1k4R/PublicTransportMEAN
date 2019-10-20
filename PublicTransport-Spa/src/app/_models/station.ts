import { Address } from './address';
import { Location } from './location';
import { StationLine } from './stationLine';
import { Line } from './line';

export interface Station {
    _id: string;
    name: string;
    address: Address;
    location: Location;
    lines: Line[];
    stationLines: StationLine[];
}
