import { Line } from './line';

export interface NewStation {
    name: string;
    street: string;
    number: string;
    city: string;
    x: number;
    y: number;
    lines: Line[];
}
