import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ChangePhototService {

    private subject = new Subject<any>();

    observable$ = this.subject.asObservable();

    change(state?: any) {
        this.subject.next(state);
    }
}
