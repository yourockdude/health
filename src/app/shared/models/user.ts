import { File } from './file';

export class User {
    id?: string;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    photo?: string;
    gender?: string;
    birth?: string;
    phone?: string;
    location?: string;
    role?: number;
    files?: File[];
    fId?: string;
    vId?: string;
    gId?: string;
}
