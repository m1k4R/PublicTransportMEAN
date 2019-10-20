import { Station } from './station';
import { Bus } from './bus';

export interface NewLine {
    lineNumber: number;
    name: string;
    stations: Station[];
    buses: Bus[];
}
