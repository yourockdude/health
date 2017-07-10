import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NotificationService {
    private subject = new Subject<any>();

    constructor() { }

    getNotification() {
        return this.subject.asObservable();
    }

    next(type, message, timeout?) {
        this.subject.next({
            type: type,
            message: message,
            timeout: timeout
        });
    }

}
