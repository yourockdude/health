import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DragNDropService {

    private source = new Subject<boolean>();

    observable$ = this.source.asObservable();

    change(state: boolean) {
        this.source.next(state);
    }
}
