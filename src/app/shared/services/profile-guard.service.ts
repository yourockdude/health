import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class ProfileGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router,
    ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authService.getUser().map(res => {
            if (res.success) {
                const user: User = res.data;
                const requiredField = [
                    user.middleName,
                    user.phone,
                    user.photo,
                ];
                if (user.role === 0) {
                    return true;
                } else if (requiredField.includes('')) {
                    this.router.navigate(['/intermediate']);
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        });
    }
}
