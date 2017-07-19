import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { User } from '../models/user';
import { CustomResponse } from '../models/custom-response';
import { environment } from '../../../environments/environment';
import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
    authorizationPath = '/auth';
    jwtHelper = new JwtHelper();

    constructor(
        private http: Http,
        private authHttp: AuthHttp,
        private router: Router,
    ) { }

    signIn(user: User): Observable<CustomResponse> {
        return this.http.post(`${environment.api}/auth`, user)
            .map(res => res.json());
    }

    signInViaSocial(user: User): Observable<CustomResponse> {
        return this.http.post(`${environment.api}/auth_social`, user)
            .map(res => res.json());
    }

    signUp(newUser: User): Observable<CustomResponse> {
        return this.http.post(`${environment.api}/users`, newUser)
            .map(res => res.json());
    }

    signOut(): void {
        localStorage.removeItem('token');
        this.router.navigate(['home']);
    }

    getUser(): Observable<CustomResponse> {
        return this.authHttp.get(`${environment.api}/user/me`)
            .map(res => res.json());
    }

    checkEmail(email): Observable<CustomResponse> {
        const body = { email: email };
        return this.http.post(`${environment.api}/check_email`, body)
            .map(res => res.json());
    }

    getFbProfile(token: string, id: string): Observable<any> {
        const fields = environment.facebookFields.join(',');
        return this.http.get(`${environment.facebookApi}/me?fields=${fields}&access_token=${token}`)
            .map(res => res.json());
    }

    isAuth() {
        return tokenNotExpired();
    }
}
