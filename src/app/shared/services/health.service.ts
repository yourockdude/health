import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CalendarEvent } from 'angular-calendar';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../../environments/environment';
import { AuthHttp } from 'angular2-jwt';

import { User } from '../models/user';
import { Error } from '../models/error';
import { Response } from '../models/response';
import { Event } from '../models/event';

@Injectable()
export class HealthService {
    constructor(
        private http: Http,
        private authHttp: AuthHttp,
    ) { }

    getEvents(): Observable<Response> {
        return this.authHttp.get(`${environment.api}/events`)
            .map(res => res.json());
    }

    addEvent(event: Event): Observable<Response> {
        return this.authHttp.post(`${environment.api}/events`, event)
            .map(res => res.json());
    }

    deleteEvent(id: string): Observable<Response> {
        return this.http.delete(`${environment.api}/events/${id}`)
            .map(res => res.json());
    }

    getUsers(): Observable<Response> {
        return this.authHttp.get(`${environment.api}/users`)
            .map(res => res.json());
    }

    getUsersById(id: string): Observable<Response> {
        return this.authHttp.get(`${environment.api}/users/${id}`)
            .map(res => res.json());
    }

    getAdmins(): Observable<Response> {
        return this.authHttp.get(`${environment.api}/users/admins`)
            .map(res => res.json());
    }

    deleteUser(id: string): Observable<Response> {
        return this.authHttp.delete(`${environment.api}/users/${id}`)
            .map(res => res.json());
    }

    uploadFile(file: File): Observable<Response> {
        const body = new FormData();
        body.append('hosp_chart', file);
        return this.authHttp.post(`${environment.api}/files`, body)
            .map(res => res.json());
    }

    uploadFiles(files: File[]): Observable<Response> {
        const body = new FormData();
        for (const file of files) {
            body.append('hosp_chart', file);
        };
        return this.authHttp.post(`${environment.api}/files`, body)
            .map(res => res.json());
    }

    deleteFile(id: string): Observable<Response> {
        const body = { fid: id };
        return this.authHttp.delete(`${environment.api}/files`, new RequestOptions({ body: body }))
            .map(res => res.json());
    }
}
