import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { User } from '../models/user';
import { environment } from '../../../environments/environment';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class AuthService {
    authorizationPath = '/authorization';

    constructor(
        private authHttp: AuthHttp,
        private http: Http,
        private router: Router,
    ) { }

    signIn(user: User) {
        return this.http.post(`${environment.api}/auth`, user)
            .map(res => {
                const response = res.json();
                if (response.success) {
                    localStorage.setItem('token', response.data);
                }
                return response;
            });
    }

    signUp(newUser: User) {
        return this.http.post(`${environment.api}/users`, newUser)
            .map(res => {
                const response = res.json();
                console.log(response);
                return response;
            });
    }

    signOut() {
        localStorage.removeItem('token');
        // this.router.navigate([this.authorizationPath]);
    }

    getUser() {
        return this.authHttp.get(`${environment.api}/user/me`)
            .map(res => res.json());
        // return localStorage.getItem('token');
    }

    getFbProfile(token: string, id) {
        const fields = environment.facebookFields.join(',');
        return this.http.get(`${environment.facebookApi}/me?fields=${fields}&access_token=${token}`)
            .map(res => res.json());
    }
}
