import { Address } from './address';
import { Ticket } from './ticket';

export interface User {
    _id?: string;
    name?: string;
    surname?: string;
    userName?: string;
    email?: string;
    dateOfBirth?: Date;
    address?: Address;
    userType?: string;
    accountStatus?: string;
    verified?: boolean;
    documentUrl?: string;
    publicId?: string;
    tickets?: Ticket[];
    userRoles?: string[];
}
