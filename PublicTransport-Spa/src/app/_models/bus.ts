import { Location } from './location';

export interface Bus {
    _id: string;
    location: Location;
    busNumber: number;
    inUse: boolean;
}
