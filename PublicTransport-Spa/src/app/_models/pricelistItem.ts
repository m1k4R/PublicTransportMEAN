import { Item } from './item';
import { Pricelist } from './pricelist';

export interface PricelistItem {
    _id: string;
    item: Item;
    pricelist: Pricelist;
    priceH: number;
    priceD: number;
    priceM: number;
    priceA: number;
}
