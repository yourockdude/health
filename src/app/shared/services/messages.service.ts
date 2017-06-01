import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MessagesService {

    messagesSource = new Subject<{ isNew: boolean, messages: any }>();

    receive$ = this.messagesSource.asObservable();

    sendMessages(messageObject: { isNew: boolean, messages: any }) {
        this.messagesSource.next(messageObject);
    }
}
