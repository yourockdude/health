import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
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

    getClients() {
        return this.http.get(`${environment.api}/users`)
            .map(res => res.json());
    }
}