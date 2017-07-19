import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    authPath = 'auth';

    constructor(
        private authService: AuthService,
        private router: Router,
    ) { }

    canActivate() {
        return Observable.create((observer: any) => {
            const user = this.authService.isAuth();
            if (!user) {
                observer.next(false);
                this.router.navigate([this.authPath]);
            } else {
                observer.next(true);
            }
            observer.complete();
        });

    }
}
