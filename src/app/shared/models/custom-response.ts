import { CustomError } from './custom-error';

export class CustomResponse {
    success: boolean;
    data?: any;
    error: CustomError;
}
