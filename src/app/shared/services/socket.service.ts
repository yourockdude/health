import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SocketService {
    socket;
    constructor() {
        this.socket = io.connect(environment.socketUrl);
    }

    getMessages() {
        return new Observable(observer => {
            this.socket.on('receive-message', (data) => observer.next(data));
        });
    }

    sendMessage(data) {
        this.socket.emit('send-message', data);
    }

    connection() {
        return new Observable(observer => {
            this.socket.on('connect', () => observer.complete());
        });
    }

    enterRoom(data) {
        this.socket.emit('enter-room', data);
    }
}
