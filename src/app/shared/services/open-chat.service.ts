import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class OpenChatService {

    private source = new Subject<any>();

    observable$ = this.source.asObservable();

    change(state?: any) {
        this.source.next(state);
    }
}
