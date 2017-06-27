import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import { AuthHttp } from 'angular2-jwt';

import { User } from '../models/user';
import { CustomResponse } from '../models/custom-response';
import { CalendarEvent } from '../models/calendar-event';

@Injectable()
export class HealthService {
    constructor(
        private http: Http,
        private authHttp: AuthHttp,
    ) { }

    getEvents(): Observable<CustomResponse> {
        return this.authHttp.get(`${environment.api}/events`)
            .map(res => res.json());
    }

    addEvent(event: CalendarEvent): Observable<CustomResponse> {
        return this.authHttp.post(`${environment.api}/events`, event)
            .map(res => res.json());
    }

    deleteEvent(id: string): Observable<CustomResponse> {
        return this.authHttp.delete(`${environment.api}/events/${id}`)
            .map(res => res.json());
    }

    getUsers(): Observable<CustomResponse> {
        return this.authHttp.get(`${environment.api}/users`)
            .map(res => res.json());
    }

    getUsersById(id: string): Observable<CustomResponse> {
        return this.authHttp.get(`${environment.api}/users/${id}`)
            .map(res => res.json());
    }

    getAdmins(): Observable<CustomResponse> {
        return this.authHttp.get(`${environment.api}/users/admins`)
            .map(res => res.json());
    }

    getClients(): Observable<CustomResponse> {
        return this.authHttp.get(`${environment.api}/users/only_users`)
            .map(res => res.json());
    }

    deleteUser(id: string): Observable<CustomResponse> {
        return this.authHttp.delete(`${environment.api}/users/${id}`)
            .map(res => res.json());
    }

    uploadFile(file: File): Observable<CustomResponse> {
        const body = new FormData();
        body.append('hosp_chart', file);
        return this.authHttp.post(`${environment.api}/files`, body)
            .map(res => res.json());
    }

    uploadFiles(files: File[]): Observable<CustomResponse> {
        const body = new FormData();
        for (const file of files) {
            body.append('hosp_chart', file);
        };
        return this.authHttp.post(`${environment.api}/files`, body)
            .map(res => res.json());
    }

    renameFile(id: number, name: string): Observable<CustomResponse> {
        return this.authHttp.put(`${environment.api}/files`, { fid: id, newName: name })
            .map(res => res.json());
    }

    deleteFile(id: number): Observable<CustomResponse> {
        const body = { fid: id };
        return this.authHttp.delete(`${environment.api}/files`, new RequestOptions({ body: body }))
            .map(res => res.json());
    }

    uploadProfilePhoto(file: File) {
        const body = new FormData();
        body.append('user_photo', file);
        return this.authHttp.post(`${environment.api}/user_photo`, body)
            .map(res => res.json());
    }
}
