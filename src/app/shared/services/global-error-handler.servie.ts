import { Injectable, ErrorHandler } from '@angular/core';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
    constructor() { }

    handleError(error: any): void {
        console.error('бля ошибка', error);
        // TODO added loggger or sending on email
    }
}
