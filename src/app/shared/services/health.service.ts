import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CalendarEvent } from 'angular-calendar';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../../environments/environment';

@Injectable()
export class HealthService {
    constructor(private http: Http) { }

    getEvents() {
        return this.http.get(`${environment.api}/events`)
            .map(res => res.json());
    }

    addEvent(event) {
        return this.http.post(`${environment.api}/events`, event)
            .map(res => res.json());
    }

    deleteEvent(id) {
        return this.http.delete(`${environment}/events/${id}`)
            .map(res => res.json());
    }
}
