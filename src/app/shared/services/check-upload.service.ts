import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CheckUploadService {

    private uploadSourse = new Subject<boolean>();

    upload$ = this.uploadSourse.asObservable();

    changeState(isUpload: boolean) {
        this.uploadSourse.next(isUpload);
    }
}
