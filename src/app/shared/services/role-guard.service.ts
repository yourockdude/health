import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class RoleGuard implements CanActivate {
    role;

    constructor(
        private authService: AuthService,
        private router: Router,
    ) {
        this.authService.getUser().subscribe(res => {
            if (res.success) {
                this.role = res.data.role === 0 ? 'admin' : 'user';
            } else {
                console.log('error');
            }
        });
    }

    canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot) {
        if (activatedRouteSnapshot.data.roles.indexOf(this.role) === -1) {
            this.router.navigate(['']);
            return false;
        }
        return true;
    }
}
