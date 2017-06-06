import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ReadMessageService {
    private navbarToChatSource = new Subject<any>();
    private chatToNavbarSource = new Subject<any>();

    navbarToChatObservable$ = this.navbarToChatSource.asObservable();
    chatToNavbarObservable$ = this.chatToNavbarSource.asObservable();

    navbarToChatChange(value: any) {
        this.navbarToChatSource.next(value);
    }

    chatToNavbarChange(value: any) {
        this.chatToNavbarSource.next(value);
    }
}
