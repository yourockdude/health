import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { User } from '../models/user';

@Injectable()
export class PassUserService {
    // pass user from auth to navbar
    private source = new Subject<boolean>();

    observable$ = this.source.asObservable();

    change(state: boolean): void {
        this.source.next(state);
    }
}
