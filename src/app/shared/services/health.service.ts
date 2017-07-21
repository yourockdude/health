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

    addEvent(event: any): Observable<CustomResponse> {
        return this.authHttp.post(`${environment.api}/events`, event)
            .map(res => res.json());
    }
    addEventAsAdmin(event: any, id: string): Observable<CustomResponse> {
        return this.authHttp.post(`${environment.api}/events/${id}`, event)
            .map(res => res.json());
    }

    editEvent(event): Observable<CustomResponse> {
        return this.authHttp.put(`${environment.api}/events/${event.id}`, event)
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

    getUsersByRole(role: number): Observable<CustomResponse> {
        switch (role) {
            case 0:
                return this.getClients();
            case 1:
                return this.getAdmins();
        }
    }

    deleteUser(id: string): Observable<CustomResponse> {
        return this.authHttp.delete(`${environment.api}/users/${id}`)
            .map(res => res.json());
    }

    editProfile(user: User): Observable<CustomResponse> {
        return this.authHttp.put(`${environment.api}/user/me`, user)
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

    renameFile(id: string, name: string): Observable<CustomResponse> {
        return this.authHttp.put(`${environment.api}/files`, { fid: id, newName: name })
            .map(res => res.json());
    }

    renameFileAsAdmin(userId: string, fileId: string, newName: string) {
        return this.authHttp.put(`${environment.api}/admin/files`, { uid: userId, fid: fileId, newName: newName })
            .map(res => res.json());
    }

    deleteFile(id: string): Observable<CustomResponse> {
        const body = { fid: id };
        return this.authHttp.delete(`${environment.api}/files`, new RequestOptions({ body: body }))
            .map(res => res.json());
    }

    deleteFileAsAdmin(userId: string, fileId: string): Observable<CustomResponse> {
        const body = {
            uid: userId,
            fid: fileId,
        };
        return this.authHttp.delete(`${environment.api}/admin/files`, new RequestOptions({ body: body }))
            .map(res => res.json());
    }

    uploadProfilePhoto(file: File) {
        const body = new FormData();
        body.append('user_photo', file);
        return this.authHttp.post(`${environment.api}/user_photo`, body)
            .map(res => res.json());
    }

    getWorkTime() {
        return this.authHttp.get(`${environment.api}/hospGlobal`)
            .map(res => res.json());
    }

    editWorkTime(time) {
        return this.authHttp.put(`${environment.api}/hospGlobal`, time)
            .map(res => res.json());
    }
}
