import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CalendarEvent } from 'angular-calendar';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../../environments/environment';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class HealthService {
    constructor(
        private http: Http,
        private authHttp: AuthHttp,
    ) { }

    getEvents() {
        return this.authHttp.get(`${environment.api}/events`)
            .map(res => res.json());
    }

    addEvent(event) {
        return this.authHttp.post(`${environment.api}/events`, event)
            .map(res => res.json());
    }

    deleteEvent(id) {
        return this.http.delete(`${environment.api}/events/${id}`)
            .map(res => res.json());
    }

    getUsers() {
        return this.authHttp.get(`${environment.api}/users`)
            .map(res => res.json());
    }

    getUsersById(id) {
        return this.authHttp.get(`${environment.api}/users/${id}`)
            .map(res => res.json());
    }

    getAdmins() {
        return this.authHttp.get(`${environment.api}/admins`)
            .map(res => res.json());
    }

    deleteUser(id) {
        return this.authHttp.delete(`${environment.api}/users/${id}`)
            .map(res => res.json());
    }

    uploadFile(file: File) {
        const body = new FormData();
        body.append('hosp_chart', file);
        return this.authHttp.post(`${environment.api}/files`, body)
            .map(res => res.json());
    }

    uploadFiles(files) {
        const body = new FormData();
        body.append('hosp_chart', JSON.stringify(files));
        return this.authHttp.post(`${environment.api}/files`, body)
            .map(res => res.json());
    }

    deleteFile(id) {
        const body = { fid: id };
        return this.authHttp.delete(`${environment.api}/files`, new RequestOptions({ body: body }))
            .map(res => res.json());
    }
}
