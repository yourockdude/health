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
    authorizationPath = '/auth';

    constructor(
        private authHttp: AuthHttp,
        private http: Http,
        private router: Router,
    ) { }

    signIn(user: User) {
        // TODO temporary
        const newUser = {
            username: user.email,
            password: user.password,
        };
        return this.http.post(`${environment.api}/auth`, newUser)
            .map(res => res.json());

        // return this.http.post(`${environment.api}/auth`, user)
        //     .map(res => res.json());
    }

    signInViaSocial(user: User) {
        return this.http.post(`${environment.api}/authSocial`, user)
            // TODO temporary
            .map(res => {
                const flags = ['newUser', 'emailExist'];
                const index = Math.floor(Math.random() * flags.length);
                console.log(flags[index]);
                return {
                    success: true,
                    data: {
                        flag: flags[index],
                        token: '',
                    }
                };
            });
        // .map(res => res.json());
    }

    signUp(newUser: User) {
        return this.http.post(`${environment.api}/users`, newUser)
            .map(res => res.json());
    }

    signOut() {
        localStorage.removeItem('token');
        this.router.navigate([this.authorizationPath]);
    }

    getUser() {
        return this.authHttp.get(`${environment.api}/user/me`)
            .map(res => res.json());
        // return localStorage.getItem('token');
    }

    checkToken() {
        return localStorage.getItem('token');
    }

    getFbProfile(token: string, id) {
        const fields = environment.facebookFields.join(',');
        return this.http.get(`${environment.facebookApi}/me?fields=${fields}&access_token=${token}`)
            .map(res => res.json());
    }
}
