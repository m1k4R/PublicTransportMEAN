export interface UserRegister {
    userName: string;
    userType: string;
    email: string;
    password: string;
    name: string;
    surname: string;
    city: string;
    street: string;
    number: string;
    dateOfBirth: Date;
    documentUrl?: string;
    accountStatus?: string;
}
