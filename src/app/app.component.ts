import { Component, OnInit } from '@angular/core';
import { SocketService } from './shared/services/socket.service';
import { AuthService } from './shared/services/auth.service';
import { MessagesService } from './shared/services/messages.service';
import { User } from './shared/models/user';
import { environment } from '../environments/environment';
import { JwtHelper } from 'angular2-jwt';

@Component({
    selector: 'health-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [SocketService, AuthService, MessagesService]
})
export class AppComponent implements OnInit {
    currentUser;
    jwtHelper = new JwtHelper();
    messages = [];

    constructor(
        private authService: AuthService,
        private socketService: SocketService,
        private messagesService: MessagesService,
    ) {
        if (localStorage.getItem('token') !== null && !this.jwtHelper.isTokenExpired(localStorage.getItem('token'))) {
            this.socketService.connection().subscribe();
            this.authService.getUser().subscribe(res => {
                if (res.success) {
                    this.currentUser = res.data;
                    if (this.currentUser.userGroup === 0) {
                        this.authService.getUsers().subscribe(r => {
                            if (r.success) {
                                for (const u of r.data) {
                                    if (u.id !== this.currentUser.id) {
                                        this.socketService.enterRoom({ user: this.currentUser.name, room: u.id });
                                    }
                                }
                            }
                        });
                    } else {
                        this.socketService.enterRoom({ user: this.currentUser.name, room: this.currentUser.id });
                    }
                }
            });
        }
    }

    ngOnInit(): void {
        this.getMessages();
    }

    getMessages() {
        this.socketService.getMessages().subscribe(message => {
            this.messages.push(message);
            this.messagesService.sendMessages({ isNew: true, messages: message });
        });
    }

}
