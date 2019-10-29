export interface UserRegister {
    _id?: string;
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
    verified?: boolean;
    publicId?: string;
    image?: File;
}
