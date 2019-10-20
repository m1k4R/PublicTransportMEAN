import { PricelistItem } from './pricelistItem';
import { User } from './user';

export interface Ticket {
    _id: string;
    dateOfIssue: Date;
    ticketType: string;
    isValid: boolean;
    user: User;
    priceInfo: PricelistItem;
    checkResult?: string;
}
