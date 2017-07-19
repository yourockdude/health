import { CustomError } from './custom-error';
import { User } from '../models/user';

export class CustomResponse {
    success: boolean;
    data?: any | User;
    error: CustomError;
}
